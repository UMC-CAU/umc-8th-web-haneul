import React from 'react';
import { useNavigate } from 'react-router-dom';

const DefaultErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold tracking-widest text-gray-800">404</h1>
        <div className="mx-auto my-6 h-1 w-24 rounded-full bg-indigo-500"></div>
        <p className="mb-8 text-2xl font-medium text-gray-700">페이지를 찾을 수 없습니다</p>
        <p className="mb-8 text-gray-500">
          찾으시려는 페이지가 삭제되었거나 주소가 변경되었거나 일시적으로 사용할 수 없습니다.
        </p>
        <button
          onClick={() => navigate('/')}
          className="focus:ring-opacity-50 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-colors duration-300 hover:bg-indigo-700 hover:shadow-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default DefaultErrorPage;
