import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Something went wrong while fetching the data.
        </p>
        <p className="mt-2 text-gray-500">
          Please try again later or contact support if the issue persists.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 mt-6 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
