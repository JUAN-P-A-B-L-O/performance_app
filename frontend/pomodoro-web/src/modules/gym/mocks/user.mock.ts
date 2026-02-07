import { UserProfile } from "../domain/types";

export const mockUser: UserProfile = {
  id: "user-1",
  name: "Jordan Lee",
  nickname: "J",
  age: 29,
  height: { value: 178, unit: "cm" },
  goal: "strength",
  experience: "intermediate",
  units: { weight: "kg", height: "cm", energy: "calories" },
  activityLevel: "Moderately active",
  injuries: "Mild right shoulder limitation",
  settings: {
    calorieTarget: 2600,
    proteinTarget: 175,
    showStreaks: true,
    defaultWeightIncrement: 2.5,
  },
};
