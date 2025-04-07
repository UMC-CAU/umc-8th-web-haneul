import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import MoviesPage from "./pages/MoviesPage";
import RootLayout from "./layout/RootLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <HomePage />,
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, // points the home direction
          element: <HomePage />,
        },
        {
          path: "movies",
          element: <MoviesPage />,
          errorElement: <h1>Movie Error Element!</h1>,
          children: [
            {
              path: ":movieId",
              element: <MoviesPage />,
            },
          ],
        },
      ],
    },
    // {
    //   path: "/movies",
    //   element: <MoviesPage />,
    // },
    {
      path: "/todo",
      element: <TodoContainer />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
