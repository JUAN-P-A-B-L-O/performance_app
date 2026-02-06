import {
  BodyWeightEntry,
  Exercise,
  Goal,
  MealTemplate,
  NutritionDaySummary,
  ProgramTemplate,
  RecoveryEntry,
  UserProfile,
  WorkoutSession,
} from "../domain/types";
import { seedGymDataIfEmpty } from "../mocks/seed";
import { ensureSeeded, read, write } from "./storage";

ensureSeeded(seedGymDataIfEmpty);

const USER_KEY = "gym:user";
const EXERCISE_KEY = "gym:exercises";
const PROGRAM_KEY = "gym:programs";
const WORKOUT_KEY = "gym:workouts";
const BODY_KEY = "gym:bodyweights";
const NUTRITION_KEY = "gym:nutrition";
const MEAL_KEY = "gym:mealTemplates";
const RECOVERY_KEY = "gym:recovery";
const GOAL_KEY = "gym:goals";

function updateList<T extends { id: string }>(key: string, item: T) {
  const list = read<T[]>(key, []);
  const index = list.findIndex((entry) => entry.id === item.id);
  if (index >= 0) {
    list[index] = item;
  } else {
    list.push(item);
  }
  write(key, list);
}

function deleteFromList<T extends { id: string }>(key: string, id: string) {
  const list = read<T[]>(key, []);
  write(
    key,
    list.filter((entry) => entry.id !== id)
  );
}

export const GymRepositoryMock = {
  async getUser() {
    return read<UserProfile>(USER_KEY, {
      id: "",
      name: "",
      nickname: "",
      height: { value: 0, unit: "cm" },
      goal: "maintenance",
      experience: "beginner",
      units: { weight: "kg", height: "cm", energy: "calories" },
      activityLevel: "",
    });
  },
  async saveUser(user: UserProfile) {
    write(USER_KEY, user);
  },
  async listExercises() {
    return read<Exercise[]>(EXERCISE_KEY, []);
  },
  async getExercise(id: string) {
    return read<Exercise[]>(EXERCISE_KEY, []).find(
      (exercise) => exercise.id === id
    );
  },
  async saveExercise(exercise: Exercise) {
    updateList(EXERCISE_KEY, exercise);
  },
  async listPrograms() {
    return read<ProgramTemplate[]>(PROGRAM_KEY, []);
  },
  async getProgram(id: string) {
    return read<ProgramTemplate[]>(PROGRAM_KEY, []).find(
      (program) => program.id === id
    );
  },
  async saveProgram(program: ProgramTemplate) {
    updateList(PROGRAM_KEY, program);
  },
  async duplicateProgram(id: string) {
    const programs = read<ProgramTemplate[]>(PROGRAM_KEY, []);
    const program = programs.find((item) => item.id === id);
    if (!program) {
      return;
    }
    const clone: ProgramTemplate = {
      ...program,
      id: `program-${Date.now()}`,
      name: `${program.name} (Copy)`,
    };
    write(PROGRAM_KEY, [...programs, clone]);
  },
  async listWorkouts() {
    return read<WorkoutSession[]>(WORKOUT_KEY, []);
  },
  async getWorkout(id: string) {
    return read<WorkoutSession[]>(WORKOUT_KEY, []).find(
      (workout) => workout.id === id
    );
  },
  async saveWorkout(workout: WorkoutSession) {
    updateList(WORKOUT_KEY, workout);
  },
  async deleteWorkout(id: string) {
    deleteFromList<WorkoutSession>(WORKOUT_KEY, id);
  },
  async listBodyWeight() {
    return read<BodyWeightEntry[]>(BODY_KEY, []);
  },
  async addBodyWeight(entry: BodyWeightEntry) {
    updateList(BODY_KEY, entry);
  },
  async deleteBodyWeight(id: string) {
    deleteFromList<BodyWeightEntry>(BODY_KEY, id);
  },
  async getNutritionDay(date: string) {
    return read<NutritionDaySummary[]>(NUTRITION_KEY, []).find(
      (day) => day.date === date
    );
  },
  async upsertNutritionDay(day: NutritionDaySummary) {
    updateList(NUTRITION_KEY, day);
  },
  async listNutritionRange(from: string, to: string) {
    return read<NutritionDaySummary[]>(NUTRITION_KEY, []).filter(
      (day) => day.date >= from && day.date <= to
    );
  },
  async listMealTemplates() {
    return read<MealTemplate[]>(MEAL_KEY, []);
  },
  async saveMealTemplates(templates: MealTemplate[]) {
    write(MEAL_KEY, templates);
  },
  async getRecoveryDay(date: string) {
    return read<RecoveryEntry[]>(RECOVERY_KEY, []).find(
      (day) => day.date === date
    );
  },
  async upsertRecoveryDay(day: RecoveryEntry) {
    updateList(RECOVERY_KEY, day);
  },
  async listRecoveryRange(from: string, to: string) {
    return read<RecoveryEntry[]>(RECOVERY_KEY, []).filter(
      (day) => day.date >= from && day.date <= to
    );
  },
  async listGoals() {
    return read<Goal[]>(GOAL_KEY, []);
  },
  async saveGoal(goal: Goal) {
    updateList(GOAL_KEY, goal);
  },
};
