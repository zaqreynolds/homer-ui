import { create } from "zustand";
import { nanoid } from "nanoid";
import type { Workout } from "../types/workout";

// DRY helper for nested updates
const updateNested = <T extends { id: string }>(
  items: T[],
  id: string,
  updater: (item: T) => T
) => items.map((item) => (item.id === id ? updater(item) : item));

export type WorkoutStore = {
  workouts: Workout[];
  addWorkout: (name: string) => void;
  removeWorkout: (id: string) => void;
  updateWorkout: (id: string, updates: Partial<Workout>) => void;
  addExercise: (workoutId: string, exerciseName: string) => void;
  removeExercise: (workoutId: string, exerciseId: string) => void;
  updateExercise: (
    workoutId: string,
    exerciseId: string,
    updates: Partial<Workout["exercises"][0]>
  ) => void;
  addCircuit: (workoutId: string, circuitName: string) => void;
  removeCircuit: (workoutId: string, circuitId: string) => void;
  updateCircuit: (
    workoutId: string,
    circuitId: string,
    updates: Partial<Workout["circuits"][0]>
  ) => void;
  addSet: (
    workoutId: string,
    exerciseId: string,
    setDetails: Partial<Workout["exercises"][0]["sets"][0]>
  ) => void;
  removeSet: (workoutId: string, exerciseId: string, setId: string) => void;
  updateSet: (
    workoutId: string,
    exerciseId: string,
    setId: string,
    updates: Partial<Workout["exercises"][0]["sets"][0]>
  ) => void;
};

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],

  addWorkout: (name: string) =>
    set((state) => ({
      workouts: [
        ...state.workouts,
        {
          id: nanoid(),
          name,
          exercises: [],
          circuits: [],
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  removeWorkout: (id: string) =>
    set((state) => ({
      workouts: state.workouts.filter((workout) => workout.id !== id),
    })),

  updateWorkout: (id: string, updates: Partial<Workout>) =>
    set((state) => ({
      workouts: updateNested(state.workouts, id, (workout) => ({
        ...workout,
        ...updates,
        updatedAt: new Date().toISOString(),
      })),
    })),

  addExercise: (workoutId: string, exerciseName: string) =>
    set((state) => ({
      workouts: updateNested(state.workouts, workoutId, (workout) => ({
        ...workout,
        exercises: [
          ...workout.exercises,
          {
            id: nanoid(),
            workoutId,
            name: exerciseName,
            order: workout.exercises.length + 1,
            type: "strength",
            muscleGroups: [],
            equipment: [],
            sets: [],
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      })),
    })),

  removeExercise: (workoutId: string, exerciseId: string) =>
    set((state) => ({
      workouts: updateNested(state.workouts, workoutId, (workout) => ({
        ...workout,
        exercises: workout.exercises.filter(
          (exercise) => exercise.id !== exerciseId
        ),
      })),
    })),

  updateExercise: (
    workoutId: string,
    exerciseId: string,
    updates: Partial<Workout["exercises"][0]>
  ) =>
    set((state) => ({
      workouts: updateNested(state.workouts, workoutId, (workout) => ({
        ...workout,
        exercises: updateNested(workout.exercises, exerciseId, (exercise) => ({
          ...exercise,
          ...updates,
          updatedAt: new Date().toISOString(),
        })),
      })),
    })),

  addCircuit: (workoutId: string, circuitName: string) =>
    set((state) => ({
      workouts: updateNested(state.workouts, workoutId, (workout) => ({
        ...workout,
        circuits: [
          ...(workout.circuits ?? []),
          {
            id: nanoid(),
            workoutId,
            name: circuitName,
            order: (workout.circuits?.length ?? 0) + 1,
            exercises: [],
            rounds: 1,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      })),
    })),

  removeCircuit: (workoutId: string, circuitId: string) =>
    set((state) => ({
      workouts: updateNested(state.workouts, workoutId, (workout) => ({
        ...workout,
        circuits: (workout.circuits ?? []).filter(
          (circuit) => circuit.id !== circuitId
        ),
      })),
    })),

  updateCircuit: (
    workoutId: string,
    circuitId: string,
    updates: Partial<Workout["circuits"][0]>
  ) =>
    set((state) => ({
      workouts: updateNested(state.workouts, workoutId, (workout) => ({
        ...workout,
        circuits: updateNested(
          workout.circuits ?? [],
          circuitId,
          (circuit) => ({
            ...circuit,
            ...updates,
            updatedAt: new Date().toISOString(),
          })
        ),
      })),
    })),

  addSet: (
    workoutId: string,
    exerciseId: string,
    setDetails: Partial<Workout["exercises"][0]["sets"][0]>
  ) =>
    set((state) => ({
      workouts: updateNested(state.workouts, workoutId, (workout) => ({
        ...workout,
        exercises: updateNested(workout.exercises, exerciseId, (exercise) => ({
          ...exercise,
          sets: [
            ...exercise.sets,
            {
              id: nanoid(),
              exerciseId,
              order: exercise.sets.length + 1,
              reps: 0,
              weight: 0,
              completed: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              ...setDetails,
            },
          ],
        })),
      })),
    })),

  removeSet: (workoutId: string, exerciseId: string, setId: string) =>
    set((state) => ({
      workouts: updateNested(state.workouts, workoutId, (workout) => ({
        ...workout,
        exercises: updateNested(workout.exercises, exerciseId, (exercise) => ({
          ...exercise,
          sets: exercise.sets.filter((set) => set.id !== setId),
        })),
      })),
    })),

  updateSet: (
    workoutId: string,
    exerciseId: string,
    setId: string,
    updates: Partial<Workout["exercises"][0]["sets"][0]>
  ) =>
    set((state) => ({
      workouts: updateNested(state.workouts, workoutId, (workout) => ({
        ...workout,
        exercises: updateNested(workout.exercises, exerciseId, (exercise) => ({
          ...exercise,
          sets: updateNested(exercise.sets, setId, (set) => ({
            ...set,
            ...updates,
            updatedAt: new Date().toISOString(),
          })),
        })),
      })),
    })),
}));
