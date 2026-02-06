import { WorkoutExercise, WorkoutSession } from "./types";

export function calcSetVolume(weight: number, reps: number) {
  return weight * reps;
}

export function calcExerciseVolume(exercise: WorkoutExercise) {
  return exercise.sets.reduce(
    (total, set) => total + calcSetVolume(set.weight, set.reps),
    0
  );
}

export function calcWorkoutVolume(workout: WorkoutSession) {
  return workout.exercises.reduce(
    (total, exercise) => total + calcExerciseVolume(exercise),
    0
  );
}

export function epley1RM(weight: number, reps: number) {
  if (reps <= 1) {
    return weight;
  }
  return weight * (1 + reps / 30);
}

export function calc7DayMovingAverage(
  entries: Array<{ date: string; weight: number }>
) {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  return sorted.map((entry, index) => {
    const start = Math.max(0, index - 6);
    const slice = sorted.slice(start, index + 1);
    const avg =
      slice.reduce((total, item) => total + item.weight, 0) / slice.length;
    return { date: entry.date, avg: Number(avg.toFixed(2)) };
  });
}

export function detectPRsForExercise(
  workouts: WorkoutSession[],
  exerciseId: string
) {
  let weightPR = 0;
  let repPR = 0;
  let e1RMPR = 0;

  workouts.forEach((workout) => {
    workout.exercises
      .filter((exercise) => exercise.exerciseId === exerciseId)
      .forEach((exercise) => {
        exercise.sets.forEach((set) => {
          weightPR = Math.max(weightPR, set.weight);
          repPR = Math.max(repPR, set.reps);
          e1RMPR = Math.max(e1RMPR, epley1RM(set.weight, set.reps));
        });
      });
  });

  return {
    weightPR: Number(weightPR.toFixed(1)),
    repPR,
    e1RMPR: Number(e1RMPR.toFixed(1)),
  };
}

export function getWorkoutPRBadges(
  workout: WorkoutSession,
  previousWorkouts: WorkoutSession[]
) {
  const badges: string[] = [];
  workout.exercises.forEach((exercise) => {
    const previousPRs = detectPRsForExercise(
      previousWorkouts,
      exercise.exerciseId
    );
    const currentPRs = detectPRsForExercise([workout], exercise.exerciseId);

    if (currentPRs.repPR > previousPRs.repPR) {
      badges.push("Rep PR");
    }
    if (currentPRs.weightPR > previousPRs.weightPR) {
      badges.push("Weight PR");
    }
    if (currentPRs.e1RMPR > previousPRs.e1RMPR) {
      badges.push("Estimated 1RM PR");
    }
  });

  return Array.from(new Set(badges));
}
