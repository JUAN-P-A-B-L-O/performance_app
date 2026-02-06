import { Goal } from "../domain/types";

export const mockGoals: Goal[] = [
  {
    id: "goal-1",
    label: "Bench press 100kg x 5",
    deadline: "2024-12-01",
    rule: "If all sets hit reps, add +2.5kg next session",
    status: "active",
  },
  {
    id: "goal-2",
    label: "Hit protein target 6/7 days",
    deadline: "Ongoing",
    rule: "Keep quick-add meal templates for busy days",
    status: "active",
  },
];
