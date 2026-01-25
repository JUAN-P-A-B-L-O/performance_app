/**
 * Tipos de sessão de Pomodoro
 * Deve refletir exatamente o enum do backend (Java/Kotlin)
 */
export type PomodoroType =
  | "POMODORO"
  | "SHORT_BREAK"
  | "LONG_BREAK";

/**
 * Representa uma sessão de Pomodoro iniciada no backend
 * É um "Aggregate Root" simples do domínio
 */
export type PomodoroSession = {
  id: string;
  groupId: string;
  type: PomodoroType;
  startedAt: string;   // ISO string
  finishedAt?: string; // ISO string | undefined
};
