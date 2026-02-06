import { write } from "../services/storage";
import { mockBodyWeights } from "./body.mock";
import { mockExercises } from "./exercises.mock";
import { mockGoals } from "./goals.mock";
import { mockNutritionDays, mockMealTemplates } from "./nutrition.mock";
import { mockPrograms } from "./programs.mock";
import { mockRecoveryEntries } from "./recovery.mock";
import { mockUser } from "./user.mock";
import { mockWorkouts } from "./workouts.mock";

export function seedGymDataIfEmpty() {
  write("gym:user", mockUser);
  write("gym:exercises", mockExercises);
  write("gym:programs", mockPrograms);
  write("gym:workouts", mockWorkouts);
  write("gym:bodyweights", mockBodyWeights);
  write("gym:nutrition", mockNutritionDays);
  write("gym:mealTemplates", mockMealTemplates);
  write("gym:recovery", mockRecoveryEntries);
  write("gym:goals", mockGoals);
}
