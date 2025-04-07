import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieResponse } from "../types/movie";

interface IMovieData {
  type: string;
  language: string;
  page: number;
}

export const useGetMovieData = ({ type, language, page }: IMovieData) => {
  const fetchMovieData = async () => {
    const apiToken: string = import.meta.env.VITE_TMDB_API_KEY;
    const res = await axios.get<MovieResponse>(
      `https://api.themoviedb.org/3/movie/${type}?language=${language}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    return res.data;
  };

  return useQuery({
    queryKey: ["movieData", language, page, type],
    queryFn: fetchMovieData,
  });
};

// data: 쿼리의 성공적인 응답 데이터
// error: 쿼리의 에러 정보
// isLoading: 쿼리가 로딩 중인지 여부
// isError: 쿼리가 에러 상태인지 여부
// isFetching: 쿼리가 백그라운드에서 데이터를 다시 가져오는 중인지 여부
// refetch: 쿼리를 다시 실행하는 함수
