import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [language, setLanguage] = useState<string>("ko-KR");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const apiToken: string = import.meta.env.VITE_TMDB_API_KEY;

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      // 응답에 대한 타입을 정의해줍니다.
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );

      setMovies(data.results);
    };

    fetchMovies();
  }, [language]);

  return (
    <div className="mx-5">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="p-2 mt-2 text-lg border border-gray-300 rounded cursor-pointer"
      >
        <option value="ko-KR">Korean</option>
        <option value="en-US">English</option>
        <option value="ja-JP">Japanese</option>
      </select>

      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieBox key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const MovieBox = ({ movie }: { movie: Movie }) => {
  // console.log(movie);

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="object-cover rounded-lg"
      />
      <h2 className="text-lg font-semibold">{movie.title}</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {movie.release_date}
      </p>
    </div>
  );
};

export default MoviesPage;
