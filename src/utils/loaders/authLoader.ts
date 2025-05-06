// src/loaders/authLoader.ts
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../../constants/key.ts';

export const authLoader = ({ request }: LoaderFunctionArgs) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

  const url = new URL(request.url);
  console.log('[LOG] authLoader called for:', url.pathname); // 경로 확인

  if (!accessToken) {
    console.error(`AccessToken Not Found in LocalStorage.\nRedirecting to login page.`);
    throw redirect('/login');
  }

  return null;
};
