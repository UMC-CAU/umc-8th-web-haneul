import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieCreditResponse, MovieDetailsResponse } from "../types/movie";

export const useGetSpecificMovieData = ({
  movieId,
}: {
  movieId: string | undefined;
}) => {
  const fetchMovieData = async () => {
    const apiToken: string = import.meta.env.VITE_TMDB_API_KEY;
    const res = await axios.get<MovieDetailsResponse>(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    const credit = await axios.get<MovieCreditResponse>(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    return { ...res.data, ...credit.data };
  };

  return useQuery({
    enabled: !!movieId,
    queryKey: ["specificMovieData", movieId],
    queryFn: fetchMovieData,
  });
};

// data: 쿼리의 성공적인 응답 데이터
// error: 쿼리의 에러 정보
// isLoading: 쿼리가 로딩 중인지 여부
// isError: 쿼리가 에러 상태인지 여부
// isFetching: 쿼리가 백그라운드에서 데이터를 다시 가져오는 중인지 여부
// refetch: 쿼리를 다시 실행하는 함수
