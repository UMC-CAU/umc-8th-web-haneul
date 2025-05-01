import { useState } from "react";
import useForm from "../../hooks/useForm";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const googleLogoSource =
    "https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useForm({
    value: email,
    setIsValid: setIsEmailValid,
    regexString: emailRegex,
  });

  useForm({
    value: password,
    setIsValid: setIsPasswordValid,
    regexString: passwordRegex,
  });

  return (
    // <>
    <div className="flex flex-col items-center justify-center max-w-sm gap-2 mx-auto">
      {/* 뒤로가기 버튼 + 로그인 */}
      <div className="flex flex-row items-center justify-between w-full">
        <button className="ml-2" onClick={() => window.history.back()}>
          {"<"}
        </button>
        <span className="flex-grow text-center">로그인</span>
      </div>

      {/* 구글 로그인 버튼 */}
      <button className="flex items-center justify-center w-full gap-2 px-4 py-2 border rounded">
        <img src={googleLogoSource} alt="Google" className="w-5 h-5" />
        구글 로그인
      </button>

      <div>---- OR ----</div>

      {/* 정보 입력 폼 */}
      <form className="flex flex-col w-full gap-1">
        <input
          className="px-2 py-1 border rounded-lg"
          value={email}
          type="text"
          placeholder="이메일을 입력해주세요!"
          onChange={(e) => setEmail(e.target.value)}
        />
        {isEmailValid ? (
          <span className="text-sm text-green-500">올바른 이메일 입니다.</span>
        ) : (
          <span className="text-sm text-red-500">
            올바른 이메일 형식을 입력해 주세요.
          </span>
        )}
        <input
          className="px-2 py-1 border rounded-lg"
          value={password}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          onChange={(e) => setPassword(e.target.value)}
        />
        {isPasswordValid ? (
          <span className="text-sm text-green-500">
            사용 가능한 비밀번호 입니다.
          </span>
        ) : (
          <span className="text-sm text-red-500">
            비밀번호는 최소 8자 이상, 문자와 숫자를 포함해야 합니다.
          </span>
        )}
      </form>

      {/* 로그인 버튼 */}
      <button
        className={`w-full py-1 border rounded ${
          isEmailValid && isPasswordValid
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
        disabled={!(isEmailValid && isPasswordValid)}
        onClick={() => alert("Login Button Click!")}
      >
        로그인
      </button>
    </div>
    // </>
  );
};

export default LoginPage;
