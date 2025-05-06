import { useEffect, useState } from 'react';
import { ResponseMyInfoDto } from '../types/auth';
import { useMyInfoQuery } from '../apis/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  const { data: myInfo, isLoading } = useMyInfoQuery(!!accessToken);
  useEffect(() => {
    if (myInfo) {
      setData(myInfo);
    }
  }, [data]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{myInfo?.data?.name}님 환영합니다.</h1>
      <img src={myInfo?.data?.avatar as string} alt={'구글 로고'} />
      <h1>{myInfo?.data?.email}</h1>

      <button className="cursor-pointer rounded-sm bg-blue-300 p-5" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
