import type { PomodoroType } from "../pomodoroTypes";


/**
 * Modos visuais do timer (UI-friendly)
 */
export type Mode =
  | "pomodoro"
  | "short"
  | "long";

/**
 * Duração padrão de cada modo (em minutos)
 */
export const MODE_MINUTES: Record<Mode, number> = {
  pomodoro: 25,
  short: 5,
  long: 15,
};

/**
 * Mapeia modo da UI para o tipo do backend
 */
export const MODE_TO_TYPE: Record<Mode, PomodoroType> = {
  pomodoro: "POMODORO",
  short: "SHORT_BREAK",
  long: "LONG_BREAK",
};

/**
 * Converte segundos para MM:SS
 */
export function formatMMSS(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
