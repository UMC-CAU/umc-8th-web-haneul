import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full bg-gray-800 text-white p-4">
      <span className="text-xl">Haneul</span>
      <div className={"flex space-x-4 mr-2"}>
        <Link
          to={"/login"}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
        >
          로그인
        </Link>
        <Link
          to={"/signup"}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          회원가입
        </Link>
      </div>
    </header>
  );
};

export default Header;
