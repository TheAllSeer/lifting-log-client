import { StatusBar } from 'expo-status-bar';
import { SessionProvider } from './src/contexts/SessionContext';
import RootNavigation from './src/navigation';

export default function App() {
  return (
    <SessionProvider>
      <StatusBar style="light" />
      <RootNavigation />
    </SessionProvider>
  );
}
