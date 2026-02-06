import { ProgramTemplate } from "../domain/types";

export const mockPrograms: ProgramTemplate[] = [
  {
    id: "program-1",
    name: "Upper / Lower 4-Day",
    weeks: [
      {
        weekNumber: 1,
        days: [
          {
            id: "day-1",
            name: "Upper A",
            exercises: [
              {
                exerciseId: "ex-1",
                sets: 4,
                reps: "5-8",
                rest: "2-3 min",
                rpe: "7-8",
                tempo: "2-0-1",
                warmup: "2 warm-up sets",
              },
              {
                exerciseId: "ex-6",
                sets: 3,
                reps: "8-12",
                rest: "90 sec",
                rpe: "8",
              },
              {
                exerciseId: "ex-9",
                sets: 3,
                reps: "12-15",
                rest: "60 sec",
              },
            ],
          },
          {
            id: "day-2",
            name: "Lower A",
            exercises: [
              {
                exerciseId: "ex-2",
                sets: 4,
                reps: "4-6",
                rest: "3 min",
                rpe: "8",
              },
              {
                exerciseId: "ex-3",
                sets: 3,
                reps: "6-8",
                rest: "2 min",
                rpe: "8",
              },
              {
                exerciseId: "ex-12",
                sets: 3,
                reps: "30-45s",
                rest: "60 sec",
              },
            ],
          },
        ],
      },
    ],
  },
];
