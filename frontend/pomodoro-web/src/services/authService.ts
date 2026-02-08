import type { AuthPayload } from "./authStorage";

export type AuthErrorCode = "INVALID_CREDENTIALS" | "NETWORK_ERROR";

export class AuthServiceError extends Error {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

export async function login(email: string, password: string): Promise<AuthPayload> {
  const latency = 500 + Math.floor(Math.random() * 401);

  await new Promise((resolve) => setTimeout(resolve, latency));

  if (Math.random() < 0.1) {
    throw new AuthServiceError("NETWORK_ERROR", "Erro de rede.");
  }

  // Mock rule: any password different from 123456 is invalid.
  if (password !== "123456") {
    throw new AuthServiceError("INVALID_CREDENTIALS", "Credenciais invalidas.");
  }

  const normalizedEmail = email.trim().toLowerCase();

  return {
    token: "mock-jwt-token",
    user: {
      id: "user-1",
      name: "Usuario Demo",
      email: normalizedEmail,
    },
  };
}
