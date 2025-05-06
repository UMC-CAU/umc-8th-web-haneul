import { useForm } from 'react-hook-form';
import { loginSchema } from '../schemas/authSchema.ts';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorCheckingInput from '../components/errorCheckingInput.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useEffect } from 'react';

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    console.log('Login Form Submitted: ', data);
    await login(data);
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + '/v1/auth/google/login';
  };

  return (
    <div className={'flex h-full flex-col items-center justify-center'}>
      <div className={'w-[18rem] space-y-4'}>
        <div className={'relative flex w-full flex-row items-center justify-center'}>
          <button className={'absolute left-0'} onClick={() => navigate(-1)}>
            {'<'}
          </button>
          <span>로그인</span>
        </div>

        <div
          className={
            'flex w-full flex-row items-center justify-center space-x-8 rounded border border-gray-300 bg-white px-4 py-2 transition duration-200 hover:shadow-md'
          }
          onClick={handleGoogleLogin}
        >
          <img
            src={
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png'
            }
            alt="Google Logo"
            className={'h-6 w-6'}
          />
          <span>구글 로그인</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ErrorCheckingInput
            register={register('email')}
            type={'text'}
            placeholder={'이메일을 입력하세요.'}
            errorMessage={errors.email?.message}
          />
          <ErrorCheckingInput
            register={register('password')}
            type={'password'}
            placeholder={'비밀번호를 입력하세요.'}
            errorMessage={errors.password?.message}
          />

          <button
            type="submit"
            className={`w-[18rem] rounded px-4 py-2 text-white ${isValid ? 'bg-blue-500' : 'cursor-not-allowed bg-gray-500'}`}
            disabled={!isValid}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
