import { LocalWorkoutRepository } from './LocalWorkoutRepository';
import { WorkoutRepository } from './WorkoutRepository';

export type { WorkoutRepository };

// Swap this to ApiWorkoutRepository in Phase 2
export const workoutRepository: WorkoutRepository = new LocalWorkoutRepository();
