import { ExerciseName } from '../constants/exercises';
import { Workout } from '../types/types';

export const mockWorkouts: Workout[] = [
  {
    id: 'mock-workout-1',
    name: 'Push Day',
    date: '2026-04-26',
    savedAt: '2026-04-26T19:45:00.000Z',
    exercises: [
      {
        id: 'mock-ex-1-1',
        name: ExerciseName.BENCH_PRESS,
        sets: [
          { id: 'mock-set-1-1-1', reps: 8, weight: 80, unit: 'kg' },
          { id: 'mock-set-1-1-2', reps: 7, weight: 80, unit: 'kg' },
          { id: 'mock-set-1-1-3', reps: 8, weight: 75, unit: 'kg' },
        ],
      },
      {
        id: 'mock-ex-1-2',
        name: ExerciseName.OVERHEAD_PRESS,
        sets: [
          { id: 'mock-set-1-2-1', reps: 8, weight: 50, unit: 'kg' },
          { id: 'mock-set-1-2-2', reps: 7, weight: 50, unit: 'kg' },
          { id: 'mock-set-1-2-3', reps: 8, weight: 47.5, unit: 'kg' },
        ],
      },
      {
        id: 'mock-ex-1-3',
        name: ExerciseName.LATERAL_RAISE,
        sets: [
          { id: 'mock-set-1-3-1', reps: 12, weight: 12, unit: 'kg' },
          { id: 'mock-set-1-3-2', reps: 12, weight: 12, unit: 'kg' },
          { id: 'mock-set-1-3-3', reps: 10, weight: 12, unit: 'kg' },
        ],
      },
      {
        id: 'mock-ex-1-4',
        name: ExerciseName.TRICEP_PUSHDOWN,
        sets: [
          { id: 'mock-set-1-4-1', reps: 12, weight: 35, unit: 'kg' },
          { id: 'mock-set-1-4-2', reps: 10, weight: 35, unit: 'kg' },
          { id: 'mock-set-1-4-3', reps: 12, weight: 30, unit: 'kg' },
        ],
      },
    ],
  },
  {
    id: 'mock-workout-2',
    name: 'Pull Day',
    date: '2026-04-27',
    savedAt: '2026-04-27T18:20:00.000Z',
    exercises: [
      {
        id: 'mock-ex-2-1',
        name: ExerciseName.DEADLIFT,
        sets: [
          { id: 'mock-set-2-1-1', reps: 5, weight: 120, unit: 'kg' },
          { id: 'mock-set-2-1-2', reps: 5, weight: 120, unit: 'kg' },
          { id: 'mock-set-2-1-3', reps: 5, weight: 115, unit: 'kg' },
        ],
      },
      {
        id: 'mock-ex-2-2',
        name: ExerciseName.PULL_UP,
        sets: [
          { id: 'mock-set-2-2-1', reps: 8, weight: 0, unit: 'kg' },
          { id: 'mock-set-2-2-2', reps: 7, weight: 0, unit: 'kg' },
          { id: 'mock-set-2-2-3', reps: 6, weight: 0, unit: 'kg' },
        ],
      },
      {
        id: 'mock-ex-2-3',
        name: ExerciseName.BARBELL_ROW,
        sets: [
          { id: 'mock-set-2-3-1', reps: 8, weight: 70, unit: 'kg' },
          { id: 'mock-set-2-3-2', reps: 8, weight: 70, unit: 'kg' },
          { id: 'mock-set-2-3-3', reps: 8, weight: 67.5, unit: 'kg' },
        ],
      },
      {
        id: 'mock-ex-2-4',
        name: ExerciseName.BICEP_CURL,
        sets: [
          { id: 'mock-set-2-4-1', reps: 12, weight: 16, unit: 'kg' },
          { id: 'mock-set-2-4-2', reps: 10, weight: 16, unit: 'kg' },
          { id: 'mock-set-2-4-3', reps: 12, weight: 14, unit: 'kg' },
        ],
      },
    ],
  },
];
