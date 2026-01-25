import { http } from "./httpClient";
import type {
  PomodoroSession,
  PomodoroType,
} from "@/domain/pomodoro/pomodoroTypes";

/**
 * DTO para iniciar uma sessão de Pomodoro
 */
export type StartPomodoroDTO = {
  pomodoroGroupId: string;
  type: PomodoroType;
  minutes: number;
};

/**
 * Inicia uma sessão de Pomodoro
 * POST /api/pomodoros/start
 */
export async function startPomodoro(
  body: StartPomodoroDTO
): Promise<PomodoroSession> {
  const { data } = await http.post<PomodoroSession>(
    "/pomodoros/start",
    body
  );
  return data;
}

/**
 * Finaliza uma sessão de Pomodoro
 * POST /api/pomodoros/{id}/finish
 */
export async function finishPomodoro(
  sessionId: string
): Promise<PomodoroSession> {
  const { data } = await http.post<PomodoroSession>(
    `/pomodoros/${sessionId}/finish`
  );
  return data;
}
