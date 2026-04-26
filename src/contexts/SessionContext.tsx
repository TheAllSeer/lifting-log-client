import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { ActiveSession, Workout } from '../types';
import { workoutRepository } from '../storage';
import { uuid } from '../utils/uuid';

interface SessionContextValue {
  activeSession: ActiveSession | null;
  elapsed: number;
  startSession: () => Promise<void>;
  updateSession: (session: ActiveSession) => Promise<void>;
  finishSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue>({
  activeSession: null,
  elapsed: 0,
  startSession: async () => {},
  updateSession: async () => {},
  finishSession: async () => {},
});

export function useSession() {
  return useContext(SessionContext);
}

function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback((startedAt: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const startMs = new Date(startedAt).getTime();
    setElapsed(Math.floor((Date.now() - startMs) / 1000));
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startMs) / 1000));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setElapsed(0);
  }, []);

  // Rehydrate on mount
  useEffect(() => {
    (async () => {
      const session = await workoutRepository.getActiveSession();
      if (session) {
        setActiveSession(session);
        startTimer(session.startedAt);
      }
    })();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const startSession = useCallback(async () => {
    const now = new Date().toISOString();
    const session: ActiveSession = {
      id: uuid(),
      name: null,
      date: todayISO(),
      exercises: [],
      startedAt: now,
    };
    await workoutRepository.saveActiveSession(session);
    setActiveSession(session);
    startTimer(now);
  }, [startTimer]);

  const updateSession = useCallback(async (session: ActiveSession) => {
    await workoutRepository.saveActiveSession(session);
    setActiveSession(session);
  }, []);

  const finishSession = useCallback(async () => {
    if (!activeSession) return;
    const workout: Workout = {
      id: activeSession.id,
      name: activeSession.name,
      date: activeSession.date,
      exercises: activeSession.exercises,
      savedAt: new Date().toISOString(),
    };
    await workoutRepository.save(workout);
    await workoutRepository.clearActiveSession();
    setActiveSession(null);
    stopTimer();
  }, [activeSession, stopTimer]);

  return (
    <SessionContext.Provider value={{ activeSession, elapsed, startSession, updateSession, finishSession }}>
      {children}
    </SessionContext.Provider>
  );
}
