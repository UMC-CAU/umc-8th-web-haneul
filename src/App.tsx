import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import HomePage from "./pages/week3/HomePage";
import NotFound from "./pages/NotFound";
import MoviesPage from "./pages/week3/MoviesPage";
import Week3Layout from "./layout/Week3Layout";
import MoviesSpecificPage from "./pages/week3/MoviesSpecificPage";
import Week4Layout from "./layout/Week4Layout";
import LoginPage from "./pages/week4/LoginPage";
import WeekRoutePage from "./pages/WeekRoutePage";
import SignUpPage from "./pages/week4/SignUpPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WeekRoutePage />,
    },
    // Week 2
    {
      path: "w2/todo",
      element: <TodoContainer />,
    },
    // Week 3
    {
      path: "w3",
      // element: <HomePage />,
      element: <Week3Layout />,
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
        },
        {
          path: "movies/:movieId",
          element: <MoviesSpecificPage />,
        },
        {
          path: "login",
          element: <></>,
        },
      ],
    },
    // Week 4
    {
      path: "w4",
      element: <Week4Layout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "signup",
          element: <SignUpPage />,
        },
      ],
    },
    // {
    //   path: "/movies",
    //   element: <MoviesPage />,
    // },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
