import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout.tsx';
import NotFoundErrorPage from './pages/error/NotFoundErrorPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage.tsx';
import MyPage from './pages/MyPage.tsx';
import { authLoader } from './utils/loaders/authLoader.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const publicRoutes = [
    {
      path: '/',
      element: <DefaultLayout />,
      errorElement: <NotFoundErrorPage />,
      children: [
        {
          path: '/',
          element: <div>Home</div>,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },
        {
          path: 'v1/auth/google/callback',
          element: <GoogleLoginRedirectPage />,
        },
      ],
    },
  ];

  const protectedRoutes = [
    {
      path: '/',
      element: <DefaultLayout />,
      errorElement: <NotFoundErrorPage />,
      loader: authLoader,
      children: [
        {
          path: '/my',
          element: <MyPage />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
  const queryClient = new QueryClient();
  const isDev = import.meta.env.MODE === 'development';

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        {isDev && <ReactQueryDevtools initialIsOpen={true} />}
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
