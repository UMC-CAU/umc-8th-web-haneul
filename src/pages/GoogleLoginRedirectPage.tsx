import { useEffect } from 'react';
import { LOCAL_STORAGE_KEY, SERVER_TOKEN_KEY } from '../constants/key';
import { useLocalStorage } from '../hooks/useLocalStorage.tsx';

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const { setItem: setUserName } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(SERVER_TOKEN_KEY.accessToken);
    const refreshToken = urlParams.get(SERVER_TOKEN_KEY.refreshToken);
    const name = urlParams.get(SERVER_TOKEN_KEY.name);

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserName(name);

      console.log('name: ', name);

      window.location.href = '/my';
    }
  }, [setAccessToken, setRefreshToken]);
  return <div>Google Login Redirect Page</div>;
};

export default GoogleLoginRedirectPage;
