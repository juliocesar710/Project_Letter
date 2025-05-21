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
  fontSize: {
    small: '0.875rem',  // 14px
    base: '1rem',        // 16px
    medium: '1.25rem',   // 20px
    large: '1.5rem',     // 24px
    title: '2rem',       // 32px
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  iconSize: {
    small: '16px',
    base: '24px',
    large: '32px',
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
    secondary: '#cfcabf',
    background: '#f5f2ed',
    inputBackground: '#faf9f7',
    border: '#e0dcd5',
    borderFocus: '#a39e93',
    text: '#333',
    textLight: '#666',
    subtleText: '#999',
    accent: '#d49f66',
    accentDark: '#b38147',
    textContrast: '#fff',
    error: '#c17a7a',
    errorDark: '#a05252',
    success: '#88c099',
    successDark: '#6fa685',
  },
  ...common,
};

export const darkTheme = {
  colors: {
    primary: '#888888',
    primaryDark: '#6e6e6e',
    secondary: '#444444',
    background: '#1e1e1e',
    inputBackground: '#2b2b2b',
    border: '#3f3f3f',
    borderFocus: '#888888',
    text: '#e0e0e0',
    textLight: '#bbb',
    subtleText: '#b0b0b0',
    accent: '#d49f66',
    accentDark: '#b38147',
    textContrast: '#fff',
    error: '#cc6b6b',
    hover: '#333333',
    highlight: '#2e2e2e',
    success: '#4caf50',
    successDark: '#388e3c',
  },
  ...common,
};
