import React from "react";
import AppRouter from "./routes/Router";
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
