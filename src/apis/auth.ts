import {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from '../types/auth';
import { axiosInstance } from './axios';
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signup', body);

  return data;
};

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signin', body);
  console.log('Request URL: ', import.meta.env.VITE_SERVER_API_URL);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get('/v1/users/me');

  return data;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post('/v1/auth/signout');

  return data;
};

export const useSignupMutation = (): UseMutationResult<
  ResponseSignupDto,
  unknown,
  RequestSignupDto
> =>
  useMutation<ResponseSignupDto, unknown, RequestSignupDto>({
    mutationFn: postSignup,
  });

export const useSigninMutation = (): UseMutationResult<
  ResponseSigninDto,
  unknown,
  RequestSigninDto
> =>
  useMutation<ResponseSigninDto, unknown, RequestSigninDto>({
    mutationFn: postSignin,
  });

export const useMyInfoQuery = (enabled: boolean) =>
  useQuery<ResponseMyInfoDto>({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    enabled,
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: postLogout,
  });

// data: 쿼리의 성공적인 응답 데이터
// error: 쿼리의 에러 정보
// isLoading: 쿼리가 로딩 중인지 여부
// isError: 쿼리가 에러 상태인지 여부
// isFetching: 쿼리가 백그라운드에서 데이터를 다시 가져오는 중인지 여부
// refetch: 쿼리를 다시 실행하는 함수