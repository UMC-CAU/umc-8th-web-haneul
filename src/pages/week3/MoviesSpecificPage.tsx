import { useParams } from "react-router-dom";
import { useGetSpecificMovieData } from "../../hooks/useGetSpecificMovieData";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorPage from "../../components/ErrorPage";

const MoviesSpecificPage = () => {
  const { movieId } = useParams();
  const { data, isLoading, error } = useGetSpecificMovieData({ movieId });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) return <ErrorPage />;

  // console.log(data);

  // 잼민's Code 슥삭
  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 bg-center bg-cover opacity-50 blur-sm -z-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
        }}
      />

      <div className="z-10 flex flex-col items-center gap-8 p-8 text-black md:flex-row md:items-start">
        <div className="w-full transition duration-500 md:w-1/3 hover:scale-110">
          <img
            src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
            alt={data?.title}
            className="mx-auto shadow-lg rounded-xl"
          />
        </div>

        <div className="w-full space-y-2 text-lg leading-relaxed text-left md:w-2/3 md:ml-4">
          <h2 className="text-4xl font-bold">{data?.title}</h2>
          <p>
            <strong>🗓 release date</strong> {data?.release_date}
          </p>
          <p>
            <strong>🎭 genres</strong>{" "}
            {data?.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>⏱️ runtime</strong> {data?.runtime} minutes
          </p>
          <p>
            <strong>🔥 popularity</strong> {data?.popularity.toLocaleString()}
          </p>
          <p>
            <strong>⭐ vote average</strong> {data?.vote_average.toFixed(1)} /
            10
          </p>
          <p>
            <strong>💸 budget</strong> ${data?.budget.toLocaleString()}
          </p>
          <p>
            <strong>🏢 production company</strong>{" "}
            {data?.production_companies.map((c) => c.name).join(", ") ||
              "정보 없음"}
          </p>
          <p>
            <strong>🌍 production country</strong>{" "}
            {data?.production_countries.map((c) => c.name).join(", ")}
          </p>

          <p className="mt-4">{data?.overview}</p>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-6 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data?.cast.map((actor) => (
          <li
            key={actor.id}
            className="flex flex-col h-full overflow-hidden transition duration-300 bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-105"
          >
            <div className="w-full aspect-[2/3] bg-gray-200">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={actor.name}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-grow p-4 text-center flex flex-col justify-center min-h-[100px]">
              <h3 className="text-base font-semibold text-gray-800">
                {actor.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {actor.character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  // 요건 만들다 만 내 Code
  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-4 text-3xl font-bold text-center">{data?.title}</h1>
      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-medium text-gray-600">
          Release Date: {data?.release_date}
        </span>
        <span className="text-lg font-medium text-gray-600">
          Runtime: {data?.runtime} mins
        </span>
      </div>
      <div className="mb-4">
        <span className="text-xl font-semibold text-yellow-500">
          Rating: {data?.vote_average}
        </span>
      </div>
      <p className="mb-6 italic text-gray-500">"{data?.tagline}"</p>
      <p className="leading-relaxed text-gray-700">{data?.overview}</p>
    </div>
  );
};

export default MoviesSpecificPage;
