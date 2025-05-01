import { useState } from "react";
import { Movie } from "../../types/movie";

import { useNavigate } from "react-router-dom";
import { useGetMovieData } from "../../hooks/useGetMovieData";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorPage from "../../components/ErrorPage";

const MoviesPage = () => {
  const [language, setLanguage] = useState<string>("ko-KR");
  const [type, setType] = useState<string>("popular");
  const [page, setPage] = useState<number>(1);

  const {
    data: movies,
    isLoading,
    error,
  } = useGetMovieData({ type, language, page });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) return <ErrorPage />;

  const handlePageChange = (direction: boolean): void => {
    if (direction) {
      // 페이지 상향 방향
      if (!movies?.total_pages) return;
      if (page < movies?.total_pages) setPage((prev) => prev + 1);
    } else {
      if (page > 1) setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="mx-5">
      {/* NavBar */}
      <div className="flex justify-between">
        <div className="flex flex-row gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 mt-2 text-lg border border-gray-300 rounded cursor-pointer"
          >
            <option value="ko-KR">Korean</option>
            <option value="en-US">English</option>
            <option value="ja-JP">Japanese</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 mt-2 text-lg border border-gray-300 rounded cursor-pointer"
          >
            <option value="popular">인기 영화</option>
            <option value="upcoming">개봉 예정</option>
            <option value="top_rated">평점 높은</option>
            <option value="now_playing">상영 중</option>
          </select>
        </div>

        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            className="px-4 py-2 text-white transition-all rounded-full shadow-md bg-cyan-500 hover:bg-cyan-600"
            onClick={() => handlePageChange(false)}
          >
            {"<"}
          </button>
          <span className="text-lg font-semibold">{page} 페이지</span>
          <button
            className="px-4 py-2 text-white transition-all rounded-full shadow-md bg-cyan-500 hover:bg-cyan-600"
            onClick={() => handlePageChange(true)}
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies?.results.map((movie) => (
          <MovieBox key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const MovieBox = ({ movie }: { movie: Movie }) => {
  // console.log(movie);
  const navigate = useNavigate();
  return (
    <div
      className="relative bg-white rounded-lg shadow-md group dark:bg-gray-800 dark:border-gray-700"
      onClick={() => navigate(`/w3/movies/${movie.id}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="object-cover rounded-lg group-hover:blur-2xl"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition-opacity opacity-0 group-hover:opacity-100">
        <span className="text-2xl font-bold">{movie.title}</span>
        <span className="px-4 text-sm text-center">{movie.overview}</span>
      </div>
    </div>
  );
};

export default MoviesPage;
