import {createBrowserRouter, RouterProvider} from "react-router-dom";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>App</div>,
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;