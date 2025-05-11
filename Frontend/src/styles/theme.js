// theme.js ou theme.ts

const common = {
  borderRadius: {
    small: '5px',
    medium: '8px',
    large: '10px',
  },
  padding: {
    input: '12px 20px',
    button: '12px',
    container: '30px',
  },
  shadows: {
    light: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  breakpoints: {
    mobile: 'only screen and (max-width: 600px)',
    tablet: 'only screen and (max-width: 900px)',
    desktop: 'only screen and (min-width: 901px)',
  },
};

export const lightTheme = {
  colors: {
    primary: '#a39e93',
    primaryDark: '#8c8579',
    background: '#f5f2ed',
    inputBackground: '#faf9f7',
    border: '#e0dcd5',
    borderFocus: '#a39e93',
    text: '#333',
    error: '#c17a7a',
    errorDark: '#a05252',
  },
  ...common,
};

export const darkTheme = {
  colors: {
    primary: '#888888',
    primaryDark: '#6e6e6e',
    background: '#1e1e1e',
    inputBackground: '#2b2b2b',
    border: '#3f3f3f',
    borderFocus: '#888888',
    text: '#e0e0e0',
    subtleText: '#b0b0b0',
    error: '#cc6b6b',
    hover: '#333333',
    highlight: '#2e2e2e',
  },
  ...common,
};
