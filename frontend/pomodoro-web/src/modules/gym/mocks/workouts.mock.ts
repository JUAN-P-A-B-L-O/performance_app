import { WorkoutSession } from "../domain/types";

export const mockWorkouts: WorkoutSession[] = [
  {
    id: "workout-1",
    startedAt: "2024-08-01T18:10:00.000Z",
    endedAt: "2024-08-01T19:20:00.000Z",
    durationMin: 70,
    notes: "Felt strong, good sleep.",
    programDayId: "day-1",
    exercises: [
      {
        exerciseId: "ex-1",
        target: "4x6 @ RPE 8",
        hitTarget: true,
        topSet: "82.5kg x 6",
        backoff: "75kg x 3 x 6",
        sets: [
          { setNumber: 1, weight: 82.5, reps: 6, rpe: 8, restSec: 150 },
          { setNumber: 2, weight: 80, reps: 6, rpe: 8, restSec: 150 },
          { setNumber: 3, weight: 80, reps: 6, rpe: 8, restSec: 150 },
          { setNumber: 4, weight: 77.5, reps: 6, rpe: 8, restSec: 150 },
        ],
      },
      {
        exerciseId: "ex-6",
        target: "3x10",
        hitTarget: true,
        sets: [
          { setNumber: 1, weight: 55, reps: 10, rpe: 7, restSec: 90 },
          { setNumber: 2, weight: 55, reps: 10, rpe: 7, restSec: 90 },
          { setNumber: 3, weight: 55, reps: 10, rpe: 8, restSec: 90 },
        ],
      },
    ],
  },
  {
    id: "workout-2",
    startedAt: "2024-08-04T17:45:00.000Z",
    endedAt: "2024-08-04T19:00:00.000Z",
    durationMin: 75,
    notes: "Lower day, quads tight.",
    programDayId: "day-2",
    exercises: [
      {
        exerciseId: "ex-2",
        target: "4x5 @ RPE 8",
        hitTarget: true,
        topSet: "120kg x 5",
        sets: [
          { setNumber: 1, weight: 120, reps: 5, rpe: 8, restSec: 180 },
          { setNumber: 2, weight: 117.5, reps: 5, rpe: 8, restSec: 180 },
          { setNumber: 3, weight: 117.5, reps: 5, rpe: 8, restSec: 180 },
          { setNumber: 4, weight: 115, reps: 5, rpe: 8, restSec: 180 },
        ],
      },
      {
        exerciseId: "ex-3",
        target: "3x8",
        hitTarget: true,
        sets: [
          { setNumber: 1, weight: 100, reps: 8, rpe: 8, restSec: 150 },
          { setNumber: 2, weight: 100, reps: 8, rpe: 8, restSec: 150 },
          { setNumber: 3, weight: 95, reps: 8, rpe: 8, restSec: 150 },
        ],
      },
    ],
  },
  {
    id: "workout-3",
    startedAt: "2024-08-07T18:00:00.000Z",
    endedAt: "2024-08-07T19:10:00.000Z",
    durationMin: 70,
    notes: "Upper day, chased volume.",
    programDayId: "day-1",
    exercises: [
      {
        exerciseId: "ex-1",
        target: "4x7",
        hitTarget: true,
        topSet: "85kg x 7",
        sets: [
          { setNumber: 1, weight: 85, reps: 7, rpe: 8, restSec: 150 },
          { setNumber: 2, weight: 82.5, reps: 7, rpe: 8, restSec: 150 },
          { setNumber: 3, weight: 82.5, reps: 7, rpe: 8, restSec: 150 },
          { setNumber: 4, weight: 80, reps: 7, rpe: 8, restSec: 150 },
        ],
      },
      {
        exerciseId: "ex-9",
        target: "3x15",
        hitTarget: true,
        sets: [
          { setNumber: 1, weight: 10, reps: 15, rpe: 7, restSec: 60 },
          { setNumber: 2, weight: 10, reps: 15, rpe: 7, restSec: 60 },
          { setNumber: 3, weight: 10, reps: 15, rpe: 7, restSec: 60 },
        ],
      },
    ],
  },
];
