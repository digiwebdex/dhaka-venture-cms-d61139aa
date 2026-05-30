// API client for Prime Sky backend
// Same-origin in production (Nginx proxies /api → 127.0.0.1:3101)
// Override via VITE_API_BASE_URL for dev (e.g. https://primeskyint.com/api)

const RAW_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) || "/api";
export const API_BASE = RAW_BASE.replace(/\/$/, "");

const TOKEN_KEY = "primesky_admin_token";

export const getAdminToken = (): string =>
  (typeof window !== "undefined" && localStorage.getItem(TOKEN_KEY)) || "";

export const setAdminToken = (t: string) => {
  if (typeof window === "undefined") return;
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
};

function authHeaders(): Record<string, string> {
  const t = getAdminToken();
  return t ? { "x-admin-token": t } : {};
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${txt || res.statusText}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? ((await res.json()) as T) : ((await res.text()) as unknown as T);
}

export async function apiGet<T>(path: string): Promise<T> {
  return handle<T>(await fetch(`${API_BASE}${path}`));
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  return handle<T>(
    await fetch(`${API_BASE}${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(body),
    }),
  );
}

export async function apiPost<T>(path: string, body: unknown, withAuth = true): Promise<T> {
  return handle<T>(
    await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(withAuth ? authHeaders() : {}) },
      body: JSON.stringify(body),
    }),
  );
}

export async function apiDelete<T>(path: string): Promise<T> {
  return handle<T>(
    await fetch(`${API_BASE}${path}`, { method: "DELETE", headers: authHeaders() }),
  );
}

// Image upload (multipart) — requires admin token
export async function apiUpload(file: File): Promise<{ url: string; filename: string; size: number }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: authHeaders(), // no content-type, browser sets boundary
    body: fd,
  });
  return handle(res);
}

// CMS key/value helpers
export const cmsGet = <T>(key: string) => apiGet<T | null>(`/cms/${encodeURIComponent(key)}`);
export const cmsPut = <T>(key: string, value: T) => apiPut<{ ok: boolean }>(`/cms/${encodeURIComponent(key)}`, value);

// Admin login: exchanges username+password for an admin token
export async function apiLogin(username: string, password: string): Promise<{ token: string }> {
  return apiPost<{ token: string }>(`/login`, { username, password }, false);
}
