import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { RequestSigninDto, ResponseMyInfoDto } from '../types/auth';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { useLogoutMutation, useSigninMutation } from '../apis/auth';
import { useLocalStorage } from '../hooks/useLocalStorage.tsx';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  userName: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const signinHook = useSigninMutation();
  const logoutHook = useLogoutMutation();

  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const {
    getItem: getUserNameFromStorage,
    setItem: setUserNameInStorage,
    removeItem: removeUserNameFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage() ?? null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage() ?? null
  );

  const [userName, setUserName] = useState<string | null>(getUserNameFromStorage() ?? null);

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await signinHook.mutateAsync(signinData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        setUserNameInStorage(data.name);

        alert('로그인 성공');
        window.location.href = '/my';
      }
    } catch (error) {
      console.error('로그인 오류', error);
      alert('로그인 실패');
    }
  };

  const logout = async () => {
    try {
      await logoutHook.mutateAsync();

      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeUserNameFromStorage();

      setAccessToken(null);
      setRefreshToken(null);
      setUserName(null);

      alert('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 오류', error);
      alert('로그아웃 실패');
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext를 찾을 수 없습니다.');
  }

  return context;
};
