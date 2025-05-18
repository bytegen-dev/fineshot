import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import ThemeProvider from './components/ThemeProvider';

// Root App component
export default function App() {
  // Detect system color scheme (light/dark)
  const scheme = useColorScheme();

  return (
    // ThemeProvider handles auto theme switching and provides theme context
    <ThemeProvider>
      {/* NavigationContainer uses the detected theme */}
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
} 