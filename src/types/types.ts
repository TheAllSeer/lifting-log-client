import { MuscleGroup } from '../constants/muscleGroups';

export type WeightUnit = 'kg' | 'lbs';

export interface MuscleMapping {
  primary: string[];
  secondary: string[];
}

export interface WorkoutSet {
  id: string;
  reps: number;
  weight: number;
  unit: WeightUnit;
}

export interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;
  name: string | null;
  date: string; // ISO 8601 date, e.g. "2026-04-08"
  exercises: Exercise[];
  savedAt?: string; // ISO timestamp for sort order
}

export interface ActiveSession extends Workout {
  startedAt: string; // ISO timestamp of when session began
}

export type WeekStart = 'sunday' | 'monday';
export type DisplayUnit = 'kg' | 'lbs';

export interface Settings {
  weekStart: WeekStart;
  displayUnit: DisplayUnit;
}

export interface MuscleStats {
  muscle: MuscleGroup;
  value: number;
}
