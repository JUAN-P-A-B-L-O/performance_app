export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthPayload = {
  token: string;
  user: AuthUser;
};

export const AUTH_TOKEN_KEY = "auth.token";
export const AUTH_USER_KEY = "auth.user";

export function getAuth(): AuthPayload | null {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const rawUser = localStorage.getItem(AUTH_USER_KEY);

  if (!token || !rawUser) {
    return null;
  }

  try {
    const user = JSON.parse(rawUser) as AuthUser;
    return { token, user };
  } catch {
    return null;
  }
}

export function setAuth(payload: AuthPayload) {
  localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.user));
}

export function clearAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}
