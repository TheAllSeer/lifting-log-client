import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { seedMockData } from './src/data/seedMockData';
import { SessionProvider } from './src/contexts/SessionContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import RootNavigation from './src/navigation/navigation';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      if (__DEV__) await seedMockData();
      setReady(true);
    }
    init();
  }, []);

  if (!ready) return null;

  return (
    <SettingsProvider>
      <SessionProvider>
        <StatusBar style="light" />
        <RootNavigation />
      </SessionProvider>
    </SettingsProvider>
  );
}
