import { useState } from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "./styles/theme";
import AppRouter from "./routes/Router";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      
      <AppRouter toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default App;