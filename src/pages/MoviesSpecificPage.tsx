import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

import axios from "axios";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { movieId } = useParams();

  const apiToken: string = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      // 응답에 대한 타입을 정의해줍니다.
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );

      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <>
      <h1 className="mt-5">영화 데이터 불러오자</h1>
      <span>{movieId}에 대한 게시글입니다.</span>
    </>
  );
};

export default MoviesPage;
