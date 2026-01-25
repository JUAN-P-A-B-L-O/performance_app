import { http } from "./httpClient";

/**
 * Representa um Pomodoro Group vindo do backend
 */
export type PomodoroGroup = {
  id: string;
  name: string;
  createdAt?: string;
};

/**
 * DTOs
 */
export type CreatePomodoroGroupDTO = {
  name: string;
};

export type UpdatePomodoroGroupDTO = {
  name: string;
};

/**
 * GET /api/pomodoro-groups
 */
export async function listPomodoroGroups(): Promise<PomodoroGroup[]> {
  const { data } = await http.get<PomodoroGroup[]>(
    "/api/pomodoro-groups"
  );
  return data;
}

/**
 * POST /api/pomodoro-groups
 */
export async function createPomodoroGroup(
  body: CreatePomodoroGroupDTO
): Promise<PomodoroGroup> {
  const { data } = await http.post<PomodoroGroup>(
    "/api/pomodoro-groups",
    body
  );
  return data;
}

/**
 * PUT /api/pomodoro-groups/{id}
 */
export async function updatePomodoroGroup(
  groupId: string,
  body: UpdatePomodoroGroupDTO
): Promise<PomodoroGroup> {
  const { data } = await http.put<PomodoroGroup>(
    `/api/pomodoro-groups/${groupId}`,
    body
  );
  return data;
}

/**
 * DELETE /api/pomodoro-groups/{id}
 */
export async function deletePomodoroGroup(
  groupId: string
): Promise<void> {
  await http.delete(`/api/pomodoro-groups/${groupId}`);
}
