export type Seconds = number;
export type ISODateString = string; // e.g., "2023-10-05T14:48:00.000Z"

export type Set = {
  id: string;
  exerciseId: string;
  order: number;
  reps?: number;
  targetReps?: number;
  duration?: Seconds;
  weight?: number; // in kg
  restTime?: Seconds;
  comments?: string;
  notes?: string;
  completed: boolean;
  status?: "not_started" | "in_progress" | "completed";
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Exercise = {
  id: string;
  workoutId: string;
  circuitId?: string; // if part of a circuit
  phase: "warmup" | "main" | "cooldown";
  name: string;
  order: number;
  type: "strength" | "cardio" | "flexibility" | "balance";
  muscleGroups: string[]; // e.g., ['chest', 'triceps']
  equipment?: string[]; // e.g., ['dumbbell', 'barbell']
  isBodyweight?: boolean;
  weightUnit?: "kg" | "lbs";
  instructions?: string;
  videoUrl?: string;
  notes?: string;
  comments?: string;
  sets: Set[];
  completed: boolean;
  status?: "not_started" | "in_progress" | "completed";
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Circuit = {
  id: string;
  workoutId: string;
  name: string;
  phase: "warmup" | "main" | "cooldown";
  order: number;
  exercises: Exercise[];
  rounds: number;
  restBetweenExercises?: Seconds;
  restBetweenRounds?: Seconds;
  notes?: string;
  comments?: string;
  completed: boolean;
  status?: "not_started" | "in_progress" | "completed";
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Workout = {
  id: string;
  name: string;
  notes?: string;
  tags?: string[]; // e.g., ['full_body', 'upper_body']
  duration?: Seconds; // total planned duration
  exercises: Exercise[];
  circuits: Circuit[];
  completed: boolean;
  status?: "not_started" | "in_progress" | "completed";
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type CreateSet = {
  reps?: number;
  targetReps?: number;
  duration?: Seconds;
  weight?: number;
  restTime?: Seconds;
  notes?: string;
};

export type CreateExercise = {
  name: string;
  phase: "warmup" | "main" | "cooldown";
  type: "strength" | "cardio" | "flexibility" | "balance";
  muscleGroups: string[];
  equipment?: string[];
  isBodyweight?: boolean;
  weightUnit?: "kg" | "lbs";
  instructions?: string;
  videoUrl?: string;
  notes?: string;
  sets: CreateSet[];
};

export type CreateCircuit = {
  name: string;
  phase: "warmup" | "main" | "cooldown";
  rounds: number;
  restBetweenExercises?: Seconds;
  restBetweenRounds?: Seconds;
  notes?: string;
  exercises: CreateExercise[];
};

export type CreateWorkout = {
  name: string;
  notes?: string;
  tags?: string[];
  duration?: Seconds;
  exercises: CreateExercise[];
  circuits: CreateCircuit[];
};
