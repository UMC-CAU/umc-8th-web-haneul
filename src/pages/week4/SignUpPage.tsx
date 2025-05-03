import { useState } from "react";
import useForm from "../../hooks/useForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/[a-zA-Z]/, "비밀번호는 영문자를 포함해야 합니다.")
    .regex(/\d/, "비밀번호는 숫자를 포함해야 합니다.")
    .regex(/[@$!%*?&]/, "비밀번호는 특수문자를 포함해야 합니다."),
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
});

type FormFields = z.infer<schema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<string>("");

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const [nickname, setNickname] = useState<string>("");

  const [uiStep, setUiStep] = useState<number>(0);
  // 0: email, 1: password, 2: nickname, 3: complete

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

  const emailForm = () => {
    return (
      <>
        <button className="flex items-center justify-center w-full gap-2 px-4 py-2 border rounded">
          <img src={googleLogoSource} alt="Google" className="w-5 h-5" />
          구글 로그인
        </button>
        <span>---- OR ----</span>
        {/* 정보 입력 폼 */}
        <form className="flex flex-col w-full gap-1">
          {/* 이메일 입력 부분 */}
          <input
            className="px-2 py-1 border rounded-lg"
            value={email}
            type="text"
            placeholder="이메일을 입력해주세요!"
            onChange={(e) => setEmail(e.target.value)}
          />
          {isEmailValid ? (
            <span className="text-sm text-green-500">
              올바른 이메일 입니다.
            </span>
          ) : (
            <span className="text-sm text-red-500">
              올바른 이메일 형식을 입력해 주세요.
            </span>
          )}
        </form>

        {/* 로그인 버튼 */}
        <button
          className={`w-full py-1 border rounded ${
            isEmailValid
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
          disabled={!isEmailValid}
          onClick={() => {
            alert("이메일 입력 완료, 비밀번호 입력으로 이동!");
            setUiStep(1);
          }}
        >
          다음
        </button>
      </>
    );
  };

  const passwordForm = () => {
    return (
      <>
        <form className="flex flex-col w-full gap-1">
          {/* 그전에 입력한 이메일 보이게 */}
          <span className="text-center">이메일: {email}</span>
          {/* 비밀번호 입력 부분 */}
          <div className="flex">
            <input
              className="px-2 py-1 border rounded-lg w-full"
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요!"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex-grow" />
            <button
              type="button"
              className="text-sm text-blue-500 w-10"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "숨기기" : "보기"}
            </button>
          </div>

          {/* 1번쨰 입력 비밀번호 유효성 검증 */}
          {isPasswordValid ? (
            <span className="text-sm text-green-500">
              올바른 비밀번호 입니다.
            </span>
          ) : (
            <span className="text-sm text-red-500">
              올바른 비밀번호 형식을 입력해 주세요.
            </span>
          )}

          {/* 비밀번호 확인 부분 */}
          <input
            className="px-2 py-1 border rounded-lg"
            value={checkPassword}
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요!"
            onChange={(e) => setCheckPassword(e.target.value)}
          />

          {/* 2번쨰 입력 비밀번호 유효성 검증 */}
          {isPasswordValid &&
            (password === checkPassword ? (
              <span className="text-sm text-green-500">
                비밀번호가 일치합니다.
              </span>
            ) : (
              <span className="text-sm text-red-500">
                비밀번호가 일치하지 않습니다.
              </span>
            ))}

          {/* 제출 버튼 */}
          <button
            className={`w-full py-1 border rounded ${
              isPasswordValid && password === checkPassword
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
            disabled={!(isPasswordValid && password === checkPassword)}
            onClick={() => {
              alert("비밀번호 입력 완료, 닉네임 입력으로 이동!");
              setUiStep(2);
            }}
          >
            다음
          </button>
        </form>
      </>
    );
  };

  const nicknameForm = () => {
    return (
      <>
        <form className="flex flex-col w-full gap-1">
          <input
            className="px-2 py-1 border rounded-lg"
            value={nickname}
            type="text"
            placeholder="닉네임을 입력해주세요!"
            onChange={(e) => setNickname(e.target.value)}
          />
        </form>

        <button
          className={`w-full py-1 border rounded ${
            nickname.length > 0
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
          disabled={!(nickname.length > 0)}
          onClick={() => alert("회원가입 완료!")}
        >
          회원가입하기
        </button>
      </>
    );
  };

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
      {uiStep == 0 && emailForm()}
      {uiStep == 1 && passwordForm()}
      {uiStep == 2 && nicknameForm()}
    </div>
    // </>
  );
};

export default SignUpPage;
