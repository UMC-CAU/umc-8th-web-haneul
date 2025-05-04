import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/authSchema.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorCheckingInput from "../components/errorCheckingInput.tsx";
import { useEffect, useState } from "react";
import ImageUploader from "../components/ImageUploader.tsx";

type SignupForm = z.infer<typeof registerSchema>;

const SignupPage = () => {
  const {
    register,
    trigger,
    setValue,
    setError,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors, isValid, touchedFields },
  } = useForm<SignupForm>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const [uiStep, setUiStep] = useState(0);

  const currentPassword = watch("password");
  const currentConfirmPassword = watch("confirmPassword");
  useEffect(() => {
    console.log("watched PWs: ", currentPassword, currentConfirmPassword);
    trigger("password");
  }, [currentPassword]);

  useEffect(() => {
    console.log("watched PWs: ", currentPassword, currentConfirmPassword);

    if (currentPassword !== currentConfirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      console.log("비밀번호가 일치합니다.");
      clearErrors("confirmPassword");
    }
  }, [currentConfirmPassword]);

  const onSubmit = (data: SignupForm) => {
    console.log("Signup Form Submitted: ", data);
  };

  // const watchedValues = watch();
  // useEffect(() => {
  //   console.log("Form values changed:", watchedValues);
  // }, [watchedValues]);

  // useEffect(() => {
  //   console.log("isValid: ", isValid);
  // });

  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[18rem] space-y-4">
        {uiStep === 0 && (
          <>
            <ErrorCheckingInput
              register={register("email")}
              type={"text"}
              placeholder={"이메일을 입력하세요."}
              errorMessage={errors.email?.message}
            />
            {touchedFields.email && !errors.email?.message && (
              <ErrorCheckingInput
                register={register("password")}
                type={"password"}
                placeholder={"비밀번호를 입력하세요."}
                errorMessage={currentPassword ? errors.password?.message : ""}
              />
            )}

            {currentPassword && !errors.password?.message && (
              <>
                <ErrorCheckingInput
                  register={register("confirmPassword")}
                  type={"password"}
                  placeholder={"비밀번호를 다시 입력하세요."}
                  errorMessage={errors.confirmPassword?.message}
                />

                <button
                  onClick={() => setUiStep((prev) => prev + 1)}
                  type="submit"
                  className={`w-[18rem] rounded px-4 py-2 text-white ${currentConfirmPassword && !errors.confirmPassword?.message ? "bg-blue-500" : "cursor-not-allowed bg-gray-500"}`}
                  disabled={!!errors.confirmPassword?.message}
                >
                  다음
                </button>
              </>
            )}
          </>
        )}

        {uiStep == 1 &&
          touchedFields.confirmPassword &&
          !errors.confirmPassword?.message && (
            <>
              <ImageUploader onChange={(file) => setValue("avatar", file)} />
              <ErrorCheckingInput
                register={register("name")}
                type={"text"}
                placeholder={"이름을 입력하세요."}
                errorMessage={errors.name?.message}
              />
              <button
                type="submit"
                className={`w-[18rem] rounded px-4 py-2 text-white ${isValid ? "bg-blue-500" : "cursor-not-allowed bg-gray-500"}`}
                disabled={!isValid}
              >
                회원가입
              </button>
            </>
          )}
      </form>
    </div>
  );
};

export default SignupPage;
