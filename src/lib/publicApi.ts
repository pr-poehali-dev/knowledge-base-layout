const BASE = "https://functions.poehali.dev/2a8a0d46-c0b1-4715-8c84-97aa25a00564";

async function get(resource: string, params?: Record<string, string>) {
  const qs = new URLSearchParams({ resource, ...params });
  const res = await fetch(`${BASE}/?${qs}`);
  if (!res.ok) return [];
  return res.json();
}

export const publicApi = {
  getEmployees: (location?: string) =>
    get("employees", location ? { location } : undefined),
  getNews: () => get("news"),
  getDocuments: () => get("documents"),
  getPresentations: () => get("presentations"),
};
