export function validateWeight(value: number) {
  if (Number.isNaN(value)) {
    return "Weight must be a number.";
  }
  if (value < 0) {
    return "Weight must be 0 or greater.";
  }
  return "";
}

export function validateReps(value: number) {
  if (Number.isNaN(value)) {
    return "Reps must be a number.";
  }
  if (value < 0) {
    return "Reps must be 0 or greater.";
  }
  return "";
}

export function validateRpe(value?: number) {
  if (value === undefined) {
    return "";
  }
  if (value < 0 || value > 10) {
    return "RPE must be between 0 and 10.";
  }
  return "";
}

export function validateSleepQuality(value?: number) {
  if (value === undefined) {
    return "";
  }
  if (value < 1 || value > 5) {
    return "Sleep quality must be between 1 and 5.";
  }
  return "";
}
