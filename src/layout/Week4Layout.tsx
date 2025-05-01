import { Outlet, useNavigate } from "react-router-dom";

const Week4Layout = () => {
  const naviagate = useNavigate();

  return (
    <>
      <nav className="flex justify-between mx-4 mt-4">
        <span>돌려돌려LP판</span>
        <div className="flex gap-4">
          <button
            className="px-2 py-1 border rounded"
            onClick={() => naviagate("/w4/login")}
          >
            로그인
          </button>
          <button
            className="px-2 py-1 text-white rounded bg-sky-200"
            onClick={() => naviagate("/w4/signup")}
          >
            회원가입
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Week4Layout;
