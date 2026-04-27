import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { seedMockData } from './src/data/seedMockData';
import { SessionProvider } from './src/contexts/SessionContext';
import RootNavigation from './src/navigation';

export default function App() {
  useEffect(() => {
    if (__DEV__) seedMockData();
  }, []);

  return (
    <SessionProvider>
      <StatusBar style="light" />
      <RootNavigation />
    </SessionProvider>
  );
}
