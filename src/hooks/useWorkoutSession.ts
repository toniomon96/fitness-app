import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { useApp } from '../store/AppContext';
import type { WorkoutSession, LoggedExercise, LoggedSet, Program } from '../types';
import {
  setActiveSession,
  clearActiveSession,
  appendSession,
  updatePersonalRecords,
} from '../utils/localStorage';
import { calculateTotalVolume, detectPersonalRecords } from '../utils/volumeUtils';
import { advanceProgramCursor } from '../utils/programUtils';

export function useWorkoutSession() {
  const { state, dispatch } = useApp();

  const startWorkout = useCallback(
    (program: Program, dayIndex: number) => {
      const trainingDay = program.schedule[dayIndex];
      if (!trainingDay) return;

      const session: WorkoutSession = {
        id: uuid(),
        programId: program.id,
        trainingDayIndex: dayIndex,
        startedAt: new Date().toISOString(),
        exercises: trainingDay.exercises.map((pe) => ({
          exerciseId: pe.exerciseId,
          sets: Array.from({ length: pe.scheme.sets }, (_, i) => ({
            setNumber: i + 1,
            weight: 0,
            reps: 0,
            completed: false,
            timestamp: '',
          })),
        })),
        totalVolumeKg: 0,
      };

      setActiveSession(session);
      dispatch({ type: 'SET_ACTIVE_SESSION', payload: session });
    },
    [dispatch],
  );

  const updateSet = useCallback(
    (
      exerciseIdx: number,
      setIdx: number,
      data: Partial<LoggedSet>,
    ) => {
      if (!state.activeSession) return;
      const session: WorkoutSession = JSON.parse(
        JSON.stringify(state.activeSession),
      ) as WorkoutSession;
      const exercise = session.exercises[exerciseIdx];
      if (!exercise) return;
      const set = exercise.sets[setIdx];
      if (!set) return;
      Object.assign(set, data);
      if (data.completed) {
        set.timestamp = new Date().toISOString();
      }
      session.totalVolumeKg = calculateTotalVolume(session);
      setActiveSession(session);
      dispatch({ type: 'UPDATE_ACTIVE_SESSION', payload: session });
    },
    [state.activeSession, dispatch],
  );

  const addSet = useCallback(
    (exerciseIdx: number) => {
      if (!state.activeSession) return;
      const session: WorkoutSession = JSON.parse(
        JSON.stringify(state.activeSession),
      ) as WorkoutSession;
      const exercise = session.exercises[exerciseIdx];
      if (!exercise) return;
      exercise.sets.push({
        setNumber: exercise.sets.length + 1,
        weight: 0,
        reps: 0,
        completed: false,
        timestamp: '',
      });
      setActiveSession(session);
      dispatch({ type: 'UPDATE_ACTIVE_SESSION', payload: session });
    },
    [state.activeSession, dispatch],
  );

  const removeSet = useCallback(
    (exerciseIdx: number, setIdx: number) => {
      if (!state.activeSession) return;
      const session: WorkoutSession = JSON.parse(
        JSON.stringify(state.activeSession),
      ) as WorkoutSession;
      const exercise = session.exercises[exerciseIdx];
      if (!exercise || exercise.sets.length <= 1) return;
      exercise.sets.splice(setIdx, 1);
      exercise.sets.forEach((s, i) => { s.setNumber = i + 1; });
      setActiveSession(session);
      dispatch({ type: 'UPDATE_ACTIVE_SESSION', payload: session });
    },
    [state.activeSession, dispatch],
  );

  const addExercise = useCallback(
    (exerciseId: string) => {
      if (!state.activeSession) return;
      const session: WorkoutSession = JSON.parse(
        JSON.stringify(state.activeSession),
      ) as WorkoutSession;
      const newExercise: LoggedExercise = {
        exerciseId,
        sets: [{ setNumber: 1, weight: 0, reps: 0, completed: false, timestamp: '' }],
      };
      session.exercises.push(newExercise);
      setActiveSession(session);
      dispatch({ type: 'UPDATE_ACTIVE_SESSION', payload: session });
    },
    [state.activeSession, dispatch],
  );

  const completeWorkout = useCallback(
    (program: Program) => {
      if (!state.activeSession) return;
      const now = new Date().toISOString();
      const startMs = new Date(state.activeSession.startedAt).getTime();
      const durationSeconds = Math.round((Date.now() - startMs) / 1000);
      const completed: WorkoutSession = {
        ...state.activeSession,
        completedAt: now,
        durationSeconds,
        totalVolumeKg: calculateTotalVolume(state.activeSession),
      };

      const prs = detectPersonalRecords(completed, state.history);
      // Mark PR sets
      for (const pr of prs) {
        for (const loggedEx of completed.exercises) {
          if (loggedEx.exerciseId !== pr.exerciseId) continue;
          for (const set of loggedEx.sets) {
            if (set.weight === pr.weight && set.reps === pr.reps) {
              set.isPersonalRecord = true;
            }
          }
        }
      }

      appendSession(completed);
      updatePersonalRecords(prs);
      advanceProgramCursor(program);
      clearActiveSession();

      dispatch({ type: 'APPEND_SESSION', payload: completed });
      dispatch({ type: 'CLEAR_ACTIVE_SESSION' });

      return { session: completed, prs };
    },
    [state.activeSession, state.history, dispatch],
  );

  const discardWorkout = useCallback(() => {
    clearActiveSession();
    dispatch({ type: 'CLEAR_ACTIVE_SESSION' });
  }, [dispatch]);

  return {
    session: state.activeSession,
    startWorkout,
    updateSet,
    addSet,
    removeSet,
    addExercise,
    completeWorkout,
    discardWorkout,
  };
}
