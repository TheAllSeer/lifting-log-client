# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

Requires Node.js v23 (use `nvm use 23`).

```bash
npm start          # Expo dev server
npm run ios        # Run on iOS
npm run android    # Run on Android
npm run web        # Run on web
```

No lint or test scripts are configured — Expo handles bundling and type-checking via `tsc`.

## Architecture

React Native + Expo app for logging weightlifting workouts. Two main modes:

1. **Live session** — real-time workout logging with an elapsed timer, resumable across app restarts
2. **Retrospective logging** — log a past workout after the fact

### State layers

- **`SessionContext`** (`src/contexts/`) — global React Context managing the active in-progress workout. Persists to AsyncStorage under `lifting_log_active_session` and rehydrates on app launch, restarting the timer from `startedAt`.
- **`LocalWorkoutRepository`** (`src/storage/`) — implements the `WorkoutRepository` interface using AsyncStorage (`lifting_log_workouts`). The abstraction is intentional: `src/storage/index.ts` exports this implementation so it can be swapped for an `ApiWorkoutRepository` in Phase 2 without touching screens.
- **Component state** — screens use `useState` for UI and `useFocusEffect` to refresh data on focus.

### Navigation

`RootNavigation` (`src/navigation/`) mounts a bottom tab navigator (Workouts + Presets) with a `SessionBanner` overlay that appears whenever an active session exists. The Workouts tab uses a native stack: `WorkoutListScreen → LogWorkoutScreen / WorkoutDetailScreen / LiveSessionScreen`.

### Key data types (`src/types/`)

```
Workout { id, name, date (YYYY-MM-DD), exercises[], savedAt? }
Exercise { id, name, sets[] }
WorkoutSet { id, reps, weight, unit: "kg" | "lbs" }
ActiveSession extends Workout { startedAt: ISO timestamp }
```

### Conventions

- Colors: centralized in `src/theme/colors.ts` (dark theme; orange for active session, blue as primary)
- UUID: custom util in `src/utils/`
- Exercise definitions and muscle group mappings live in `src/constants/`
- `LogWorkoutScreen` uses a `dirty` ref + `beforeRemove` navigation listener to warn on unsaved changes
