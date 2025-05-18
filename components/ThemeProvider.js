import React, { createContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

// Define neutral color palettes for light and dark themes
const lightTheme = {
  background: '#FFFFFF',
  surface: '#F5F5F7',
  text: '#1A1A1A',
  border: '#E0E0E0',
  button: '#E5E5EA',
  buttonText: '#1A1A1A',
};

const darkTheme = {
  background: '#18181A',
  surface: '#232326',
  text: '#F5F5F7',
  border: '#333336',
  button: '#232326',
  buttonText: '#F5F5F7',
};

// Create a ThemeContext to provide theme values
export const ThemeContext = createContext(lightTheme);

// ThemeProvider component for auto theme switching
export default function ThemeProvider({ children }) {
  const scheme = useColorScheme();
  // Memoize theme object to avoid unnecessary re-renders
  const theme = useMemo(() => (scheme === 'dark' ? darkTheme : lightTheme), [scheme]);

  return (
    // Provide theme to all children
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
} 