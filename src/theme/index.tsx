import React from 'react';
import { colors } from './colors';
import { typography } from './typography';

export const theme = {
  colors,
  typography,
};

// Theme Context placeholder
export const ThemeContext = React.createContext(theme);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
