export function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error("Failed to read storage", error);
    return fallback;
  }
}

export function write<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to write storage", error);
  }
}

export function ensureSeeded(seedFn: () => void) {
  if (typeof window === "undefined") {
    return;
  }
  const marker = window.localStorage.getItem("gym:seeded");
  if (!marker) {
    seedFn();
    window.localStorage.setItem("gym:seeded", "true");
  }
}
