const STORAGE_KEY = 'wow_codex_gemini_api_key';

export function getBuiltApiKey(): string {
  const maybe = (process.env.API_KEY as unknown as string | undefined) ?? '';
  return typeof maybe === 'string' ? maybe : '';
}

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setStoredApiKey(next: string): void {
  if (typeof window === 'undefined') return;
  const normalized = next.trim();
  try {
    if (normalized) window.localStorage.setItem(STORAGE_KEY, normalized);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors (private mode, blocked, etc.)
  }
}

export function clearStoredApiKey(): void {
  setStoredApiKey('');
}

export function getEffectiveApiKey(): string {
  return getStoredApiKey() || getBuiltApiKey();
}

export function hasApiKey(): boolean {
  return getEffectiveApiKey().length > 0;
}
