import { lightTheme, darkTheme } from "../theme/theme.js";
import { createContext, useState, useContext, useCallback } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

// 다크모드
export const ThemeProvider = ({ children }) => {
  const [ThemeMode, setThemeMode] = useState("light");
  const themeObject = ThemeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  const { ThemeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (ThemeMode === "light") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  }, [ThemeMode, setThemeMode]);

  return [ThemeMode, toggleTheme];
}

const ThemeContext = createContext({});

// 색맹모드
export const ColorBlindContext = createContext();

export const ColorBlindProvider = ({ children }) => {
  const [isBlind, setIsBlind] = useState(false);

  return <ColorBlindContext.Provider value={{ isBlind, setIsBlind }}>{children}</ColorBlindContext.Provider>;
};
