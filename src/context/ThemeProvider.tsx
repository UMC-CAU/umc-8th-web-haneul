import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";

enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: PropsWithChildren): ReactNode => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = (): void => {
    setTheme((prev) => {
      const newTheme = prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;

      const root = document.documentElement;
      if (newTheme === THEME.DARK) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      console.log(`Theme changed to: ${newTheme}`);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
