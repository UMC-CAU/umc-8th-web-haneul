import axios, { InternalAxiosRequestConfig } from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.tsx';
import { LOCAL_STORAGE_KEY } from '../constants/key.ts';

// Axios의 요청 객체는 타입이 제한되어 있어서 config._retry처럼 기본에 없는 속성을 쓰면 타입 오류가 발생
// 이를 방지하기 위해 타입을 확장
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/*
  refreshPromise 변수를 함수 내부가 아닌 파일 최상위에 선언한 이유는, 이 변수가 여러 요청 간에 공유되어야 하기 때문입니다.
  refreshPromise는 Access Token을 갱신하는 비동기 작업의 상태를 저장합니다.

  이를 통해:
    여러 요청이 동시에 401 에러를 받더라도, 중복으로 토큰 갱신 요청을 보내지 않도록 합니다.
    이미 진행 중인 갱신 작업이 있다면, 해당 작업의 결과를 재사용할 수 있습니다.
    만약 이 변수를 함수 내부에 선언했다면, 요청마다 별도의 refreshPromise가 생성되어 중복 요청이 발생할 수 있습니다.
    따라서 전역적으로 선언하여 모든 요청이 동일한 refreshPromise를 참조하도록 한 것입니다.
 */
let refreshPromise: Promise<string> | null = null; // 변수는 let 이어야 나중에 대입 가능

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터
const onRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const accessToken = getItem();

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};
axiosInstance.interceptors.request.use(onRequestFulfilled, (error) => Promise.reject(error));

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 응답이 존재하고, 상태 코드가 401이며, originalRequest에 _retry 속성이 없을 때
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Access Token을 Refresh 하기 위해 보낸 요청일 경우,
      // 401 Error가 발생하면 Refresh Token이 만료된 것이기 때문에 Login 화면으로 Redirect
      if (originalRequest.url === '/v1/auth/refresh') {
        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeAccessToken();
        removeRefreshToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // refreshPromise가 정의되어 있지 않은 경우 정의
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          const refreshToken = getRefreshToken();

          // AccessToken refresh 요청
          const { data } = await axiosInstance.post('/v1/auth/refresh', {
            refresh: refreshToken,
          });

          const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
            window.location.href = '/login';
            return Promise.reject(error);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken: string) => {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);
