import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActiveSession, Workout } from '../types';
import { WorkoutRepository } from './WorkoutRepository';

const WORKOUTS_KEY = 'lifting_log_workouts';
const SESSION_KEY = 'lifting_log_active_session';

export class LocalWorkoutRepository implements WorkoutRepository {
  async getAll(): Promise<Workout[]> {
    const raw = await AsyncStorage.getItem(WORKOUTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Workout[];
  }

  async getById(id: string): Promise<Workout | null> {
    const all = await this.getAll();
    return all.find((w) => w.id === id) ?? null;
  }

  async save(workout: Workout): Promise<void> {
    const all = await this.getAll();
    const idx = all.findIndex((w) => w.id === workout.id);
    if (idx >= 0) {
      all[idx] = workout;
    } else {
      all.push(workout);
    }
    await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(all));
  }

  async delete(id: string): Promise<void> {
    const all = await this.getAll();
    const filtered = all.filter((w) => w.id !== id);
    await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(filtered));
  }

  async getActiveSession(): Promise<ActiveSession | null> {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ActiveSession;
  }

  async saveActiveSession(session: ActiveSession): Promise<void> {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  async clearActiveSession(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_KEY);
  }
}
