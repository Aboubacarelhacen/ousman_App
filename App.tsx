import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/theme'; // Placeholder for custom theme provider
import store from './src/store';
import RootNavigator from './src/navigation';

/**
 * Entry point for the Guarded Application.
 * Configured with global state, theming, safe area contexts, and navigation.
 */
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
