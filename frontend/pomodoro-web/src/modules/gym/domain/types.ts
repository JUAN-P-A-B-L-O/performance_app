export type Units = {
  weight: "kg" | "lb";
  height: "cm" | "ft";
  energy: "calories" | "kJ";
};

export type UserProfile = {
  id: string;
  name: string;
  nickname: string;
  age?: number;
  height: { value: number; unit: Units["height"] };
  goal: "gain muscle" | "lose fat" | "strength" | "maintenance";
  experience: "beginner" | "intermediate" | "advanced";
  units: Units;
  activityLevel: string;
  injuries?: string;
  settings?: {
    calorieTarget?: number;
    proteinTarget?: number;
    showStreaks?: boolean;
    defaultWeightIncrement?: number;
  };
};

export type Exercise = {
  id: string;
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string;
  category: string;
  difficulty: string;
  cues: string[];
  mediaUrl?: string;
  variations: string[];
  isCustom: boolean;
  createdAt: string;
};

export type ProgramTemplate = {
  id: string;
  name: string;
  weeks: ProgramWeek[];
};

export type ProgramWeek = {
  weekNumber: number;
  days: ProgramDay[];
};

export type ProgramDay = {
  id: string;
  name: string;
  exercises: ProgramExercise[];
};

export type ProgramExercise = {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: string;
  rpe?: string;
  tempo?: string;
  warmup?: string;
};

export type WorkoutSession = {
  id: string;
  startedAt: string;
  endedAt?: string;
  durationMin?: number;
  notes?: string;
  programDayId?: string;
  exercises: WorkoutExercise[];
};

export type WorkoutExercise = {
  exerciseId: string;
  target: string;
  hitTarget: boolean;
  topSet?: string;
  backoff?: string;
  sets: SetEntry[];
};

export type SetEntry = {
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
  restSec?: number;
  note?: string;
};

export type BodyWeightEntry = {
  id: string;
  date: string;
  weight: number;
};

export type MeasurementEntry = {
  id: string;
  date: string;
  waist?: number;
  chest?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
};

export type NutritionDaySummary = {
  id: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  waterL: number;
  fiber?: number;
};

export type MealTemplate = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags?: string[];
};

export type RecoveryEntry = {
  id: string;
  date: string;
  sleepHours?: number;
  sleepQuality?: 1 | 2 | 3 | 4 | 5;
  steps?: number;
  soreness?: number;
  injuryNote?: string;
};

export type Goal = {
  id: string;
  label: string;
  deadline: string;
  rule: string;
  status?: "active" | "paused" | "completed";
};
