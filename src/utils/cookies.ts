export const getCookie = (name: string): string | null => {
  const v = `; ${document.cookie}`;
  const p = v.split(`; ${name}=`);
  if (p.length === 2) return p.pop()?.split(';').shift() ?? null;
  return null;
};

export const setCookie = (name: string, value: string, maxAgeSeconds: number) => {
  document.cookie = `${name}=${value}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
};

export const formatTimeLeft = (seconds: number): string => {
  if (seconds <= 0) return 'expirado';
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  if (seconds < 86400) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  }
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  return `${d}d ${h}h`;
};