import React from 'react';
import {useNavigate} from 'react-router-dom';

const DefaultErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">404</h1>
        <div className="h-1 w-24 bg-indigo-500 mx-auto my-6 rounded-full"></div>
        <p className="text-2xl text-gray-700 font-medium mb-8">페이지를 찾을 수 없습니다</p>
        <p className="text-gray-500 mb-8">
          찾으시려는 페이지가 삭제되었거나 주소가 변경되었거나 일시적으로 사용할 수 없습니다.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default DefaultErrorPage;