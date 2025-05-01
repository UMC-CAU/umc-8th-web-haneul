// navbar.tsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex flex-row items-center justify-center gap-10 p-4 border-b-2 border-gray-300 dark:bg-red-700">
      <Link
        to={"/w3"}
        className="px-4 py-2 rounded-2xl border-1 bg-amber-200 hover:bg-amber-300"
      >
        홈 페이지로 이동
      </Link>
      <br />
      <Link
        to="/w3/movies"
        className="px-4 py-2 text-white bg-blue-500 rounded-2xl border-1 hover:bg-blue-600"
      >
        영화 목록 페이지로 이동
      </Link>

      <button
        className="flex items-center justify-center px-4 py-2 transition-all bg-gray-100 border-2 border-gray-300 rounded-2xl hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-gray-600"
        value={theme}
        onClick={toggleTheme}
      >
        {theme === "LIGHT" ? "🌞" : "🌙"}
      </button>
    </nav>
  );
};

export default Navbar;
