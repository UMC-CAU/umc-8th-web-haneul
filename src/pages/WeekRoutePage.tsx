import { Link } from "react-router-dom";

const WeekRoutePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        주차별로 Route가 나뉘어져 있습니다.
      </h1>
      <div className="space-x-4">
        <Link
          to="/w3"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Week 3
        </Link>
        <Link
          to="/w4"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Week 4
        </Link>
      </div>
    </div>
  );
};

export default WeekRoutePage;
