import { MuscleMapping } from '../types';
import { ExerciseName } from './exercises';
import { MuscleGroup } from './muscleGroups';

export const exerciseMuscleMap: Record<ExerciseName, MuscleMapping> = {
  [ExerciseName.BENCH_PRESS]: {
    primary: [MuscleGroup.CHEST],
    secondary: [MuscleGroup.TRICEPS, MuscleGroup.SHOULDERS],
  },
  [ExerciseName.INCLINE_BENCH_PRESS]: {
    primary: [MuscleGroup.CHEST, MuscleGroup.SHOULDERS],
    secondary: [MuscleGroup.TRICEPS],
  },
  [ExerciseName.OVERHEAD_PRESS]: {
    primary: [MuscleGroup.SHOULDERS],
    secondary: [MuscleGroup.TRICEPS],
  },
  [ExerciseName.LATERAL_RAISE]: {
    primary: [MuscleGroup.SHOULDERS],
    secondary: [],
  },
  [ExerciseName.TRICEP_PUSHDOWN]: {
    primary: [MuscleGroup.TRICEPS],
    secondary: [],
  },
  [ExerciseName.SQUAT]: {
    primary: [MuscleGroup.QUADS, MuscleGroup.GLUTES],
    secondary: [MuscleGroup.HAMSTRINGS, MuscleGroup.CORE],
  },
  [ExerciseName.LEG_PRESS]: {
    primary: [MuscleGroup.QUADS, MuscleGroup.GLUTES],
    secondary: [MuscleGroup.HAMSTRINGS],
  },
  [ExerciseName.LEG_CURL]: {
    primary: [MuscleGroup.HAMSTRINGS],
    secondary: [],
  },
  [ExerciseName.LEG_EXTENSION]: {
    primary: [MuscleGroup.QUADS],
    secondary: [],
  },
  [ExerciseName.CALF_RAISE]: {
    primary: [MuscleGroup.CALVES],
    secondary: [],
  },
  [ExerciseName.DEADLIFT]: {
    primary: [MuscleGroup.HAMSTRINGS, MuscleGroup.BACK_LOWER, MuscleGroup.GLUTES],
    secondary: [MuscleGroup.BACK_UPPER, MuscleGroup.CORE, MuscleGroup.FOREARMS],
  },
  [ExerciseName.PULL_UP]: {
    primary: [MuscleGroup.BACK_LATS, MuscleGroup.BACK_UPPER],
    secondary: [MuscleGroup.BICEPS, MuscleGroup.FOREARMS],
  },
  [ExerciseName.LAT_PULLDOWN]: {
    primary: [MuscleGroup.BACK_LATS],
    secondary: [MuscleGroup.BICEPS, MuscleGroup.FOREARMS],
  },
  [ExerciseName.BARBELL_ROW]: {
    primary: [MuscleGroup.BACK_UPPER, MuscleGroup.BACK_LATS],
    secondary: [MuscleGroup.BICEPS, MuscleGroup.FOREARMS],
  },
  [ExerciseName.SEATED_ROW]: {
    primary: [MuscleGroup.BACK_UPPER, MuscleGroup.BACK_LATS],
    secondary: [MuscleGroup.BICEPS],
  },
  [ExerciseName.BICEP_CURL]: {
    primary: [MuscleGroup.BICEPS],
    secondary: [MuscleGroup.FOREARMS],
  },
  [ExerciseName.HAMMER_CURL]: {
    primary: [MuscleGroup.BICEPS, MuscleGroup.FOREARMS],
    secondary: [],
  },
};
