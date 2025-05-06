import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useEffect } from 'react';

const Header = () => {
  const { userName } = useAuth();
  useEffect(() => {
    console.log('[LOG] Header component mounted, name: ', userName);
  }, []);

  return (
    <header className="flex w-full flex-row items-center justify-between bg-gray-800 p-4 text-white">
      <Link to={'/'} className="text-xl">
        Haneul
      </Link>
      <div className={'mr-2 flex space-x-4'}>
        {userName ? (
          <Link to={'/my'} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
            {userName}님 반갑습니다.
          </Link>
        ) : (
          <>
            <Link to={'/login'} className="rounded bg-white px-4 py-2 text-black hover:bg-gray-300">
              로그인
            </Link>
            <Link
              to={'/signup'}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
