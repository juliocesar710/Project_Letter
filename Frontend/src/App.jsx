import { useState } from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme, greenTheme, blueTheme, redTheme, pastelTheme, classicTheme, purpleTheme } from "./styles/theme";
import AppRouter from "./routes/Router";
  const themes = {
    light: lightTheme,
    dark: darkTheme,
    green: greenTheme,
    blue: blueTheme,
    red: redTheme,
    pastel: pastelTheme,
    classic: classicTheme,
    purple: purpleTheme,
  };

const App = () => {


  const [themeName, setThemeName] = useState("light");

  const changeTheme = (name) => setThemeName(name);

   return (
    <ThemeProvider theme={themes[themeName]}>
      <AppRouter themeName={themeName} changeTheme={changeTheme} />
    </ThemeProvider>
  );
};

export default App;
