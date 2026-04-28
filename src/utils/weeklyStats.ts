import { Workout, WeightUnit, WeekStart, DisplayUnit, MuscleStats, MuscleMapping } from '../types/types';
import { MuscleGroup } from '../constants/muscleGroups';
import { exerciseMuscleMap } from '../constants/exerciseMuscleMap';

const exerciseMapLower: Record<string, MuscleMapping> = Object.fromEntries(
  Object.entries(exerciseMuscleMap).map(([k, v]) => [k.toLowerCase(), v])
);

function getMuscleMapping(name: string): MuscleMapping | undefined {
  return exerciseMuscleMap[name as keyof typeof exerciseMuscleMap]
    ?? exerciseMapLower[name.toLowerCase()];
}

function getWeekBounds(weekStart: WeekStart): { start: Date; end: Date } {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const daysFromStart = weekStart === 'sunday' ? day : (day === 0 ? 6 : day - 1);

  const start = new Date(now);
  start.setDate(now.getDate() - daysFromStart);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

function isInWeek(dateStr: string, weekStart: WeekStart): boolean {
  const { start, end } = getWeekBounds(weekStart);
  const d = new Date(dateStr + 'T00:00:00');
  return d >= start && d <= end;
}

function toKg(weight: number, unit: WeightUnit): number {
  return unit === 'lbs' ? weight * 0.453592 : weight;
}

function toDisplayUnit(kgValue: number, displayUnit: DisplayUnit): number {
  return displayUnit === 'lbs' ? kgValue * 2.20462 : kgValue;
}

function buildRanked(map: Partial<Record<MuscleGroup, number>>): MuscleStats[] {
  return (Object.entries(map) as [MuscleGroup, number][])
    .filter(([, v]) => v > 0)
    .map(([muscle, value]) => ({ muscle, value }))
    .sort((a, b) => b.value - a.value);
}

export function getWeeklyWorkoutCount(workouts: Workout[], weekStart: WeekStart): number {
  return workouts.filter(w => isInWeek(w.date, weekStart)).length;
}

export function getWeeklySetsPerMuscle(workouts: Workout[], weekStart: WeekStart): MuscleStats[] {
  const map: Partial<Record<MuscleGroup, number>> = {};

  for (const workout of workouts) {
    if (!isInWeek(workout.date, weekStart)) continue;
    for (const exercise of workout.exercises) {
      const mapping = getMuscleMapping(exercise.name);
      if (!mapping) continue;
      const numSets = exercise.sets.length;
      for (const muscle of mapping.primary) {
        map[muscle as MuscleGroup] = (map[muscle as MuscleGroup] ?? 0) + numSets;
      }
      for (const muscle of mapping.secondary) {
        map[muscle as MuscleGroup] = (map[muscle as MuscleGroup] ?? 0) + numSets * 0.5;
      }
    }
  }

  return buildRanked(map);
}

export function getWeeklyVolumePerMuscle(
  workouts: Workout[],
  weekStart: WeekStart,
  displayUnit: DisplayUnit,
): MuscleStats[] {
  const map: Partial<Record<MuscleGroup, number>> = {};

  for (const workout of workouts) {
    if (!isInWeek(workout.date, weekStart)) continue;
    for (const exercise of workout.exercises) {
      const mapping = getMuscleMapping(exercise.name);
      if (!mapping) continue;
      const volumeKg = exercise.sets.reduce(
        (sum, s) => sum + s.reps * toKg(s.weight, s.unit),
        0,
      );
      for (const muscle of mapping.primary) {
        map[muscle as MuscleGroup] = (map[muscle as MuscleGroup] ?? 0) + volumeKg;
      }
      for (const muscle of mapping.secondary) {
        map[muscle as MuscleGroup] = (map[muscle as MuscleGroup] ?? 0) + volumeKg * 0.5;
      }
    }
  }

  const displayMap: Partial<Record<MuscleGroup, number>> = {};
  for (const [muscle, val] of Object.entries(map) as [MuscleGroup, number][]) {
    displayMap[muscle] = toDisplayUnit(val, displayUnit);
  }

  return buildRanked(displayMap);
}
