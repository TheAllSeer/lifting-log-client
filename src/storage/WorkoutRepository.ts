import { ActiveSession, Workout } from '../types';

export interface WorkoutRepository {
  getAll(): Promise<Workout[]>;
  getById(id: string): Promise<Workout | null>;
  save(workout: Workout): Promise<void>;
  delete(id: string): Promise<void>;

  getActiveSession(): Promise<ActiveSession | null>;
  saveActiveSession(session: ActiveSession): Promise<void>;
  clearActiveSession(): Promise<void>;
}
