import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockWorkouts } from './mockWorkouts';

const WORKOUTS_KEY = 'lifting_log_workouts';

export async function seedMockData(): Promise<void> {
  const existing = await AsyncStorage.getItem(WORKOUTS_KEY);
  if (existing) return;
  await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(mockWorkouts));
}
