import { ActiveSession } from '../types/types';

export interface SessionContextValue {
  activeSession: ActiveSession | null;
  elapsed: number;
  startSession: () => Promise<void>;
  updateSession: (session: ActiveSession) => Promise<void>;
  finishSession: () => Promise<void>;
}
