import { GymRepositoryMock } from "./gymRepository.mock";

export interface GymRepository {
  getUser: () => Promise<import("../domain/types").UserProfile>;
  saveUser: (
    user: import("../domain/types").UserProfile
  ) => Promise<void>;
  listExercises: () => Promise<import("../domain/types").Exercise[]>;
  getExercise: (id: string) => Promise<import("../domain/types").Exercise | undefined>;
  saveExercise: (
    exercise: import("../domain/types").Exercise
  ) => Promise<void>;
  listPrograms: () => Promise<import("../domain/types").ProgramTemplate[]>;
  getProgram: (
    id: string
  ) => Promise<import("../domain/types").ProgramTemplate | undefined>;
  saveProgram: (
    program: import("../domain/types").ProgramTemplate
  ) => Promise<void>;
  duplicateProgram: (id: string) => Promise<void>;
  listWorkouts: () => Promise<import("../domain/types").WorkoutSession[]>;
  getWorkout: (
    id: string
  ) => Promise<import("../domain/types").WorkoutSession | undefined>;
  saveWorkout: (
    workout: import("../domain/types").WorkoutSession
  ) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  listBodyWeight: () => Promise<import("../domain/types").BodyWeightEntry[]>;
  addBodyWeight: (
    entry: import("../domain/types").BodyWeightEntry
  ) => Promise<void>;
  deleteBodyWeight: (id: string) => Promise<void>;
  getNutritionDay: (
    date: string
  ) => Promise<import("../domain/types").NutritionDaySummary | undefined>;
  upsertNutritionDay: (
    day: import("../domain/types").NutritionDaySummary
  ) => Promise<void>;
  listNutritionRange: (
    from: string,
    to: string
  ) => Promise<import("../domain/types").NutritionDaySummary[]>;
  listMealTemplates: () => Promise<import("../domain/types").MealTemplate[]>;
  saveMealTemplates: (
    templates: import("../domain/types").MealTemplate[]
  ) => Promise<void>;
  getRecoveryDay: (
    date: string
  ) => Promise<import("../domain/types").RecoveryEntry | undefined>;
  upsertRecoveryDay: (
    day: import("../domain/types").RecoveryEntry
  ) => Promise<void>;
  listRecoveryRange: (
    from: string,
    to: string
  ) => Promise<import("../domain/types").RecoveryEntry[]>;
  listGoals: () => Promise<import("../domain/types").Goal[]>;
  saveGoal: (
    goal: import("../domain/types").Goal
  ) => Promise<void>;
}

export const gymRepository: GymRepository = GymRepositoryMock;
