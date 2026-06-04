const BASE = "https://functions.poehali.dev/6e3b106d-9a9b-4a88-9bf2-579ae62e3747";
const TOKEN_KEY = "kb_admin_token";

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY) || "";
export const setAdminToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearAdminToken = () => localStorage.removeItem(TOKEN_KEY);

async function req(resource: string, method = "GET", body?: object, id?: string | number) {
  const url = id
    ? `${BASE}/?resource=${resource}&id=${id}`
    : `${BASE}/?resource=${resource}`;
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Token": getAdminToken(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка запроса");
  return data;
}

export const adminApi = {
  login: async (password: string) => {
    const res = await fetch(`${BASE}/?resource=auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.ok) setAdminToken(data.token);
    return data;
  },
  changePassword: (new_password: string) =>
    req("auth/change-password", "POST", { new_password }),

  // Сотрудники
  getEmployees: () => req("employees"),
  createEmployee: (data: object) => req("employees", "POST", data),
  updateEmployee: (id: number, data: object) => req("employees", "PUT", data, id),
  deleteEmployee: (id: number) => req("employees", "DELETE", undefined, id),

  // Новости
  getNews: () => req("news", "GET"),
  getAllNews: async () => {
    const url = `${BASE}/?resource=news&all=1`;
    const res = await fetch(url, { headers: { "X-Admin-Token": getAdminToken() } });
    return res.json();
  },
  createNews: (data: object) => req("news", "POST", data),
  updateNews: (id: number, data: object) => req("news", "PUT", data, id),
  deleteNews: (id: number) => req("news", "DELETE", undefined, id),

  // Документы
  getDocuments: () => req("documents"),
  createDocument: (data: object) => req("documents", "POST", data),
  updateDocument: (id: number, data: object) => req("documents", "PUT", data, id),
  deleteDocument: (id: number) => req("documents", "DELETE", undefined, id),

  // Презентации
  getPresentations: () => req("presentations"),
  createPresentation: (data: object) => req("presentations", "POST", data),
  updatePresentation: (id: number, data: object) => req("presentations", "PUT", data, id),
  deletePresentation: (id: number) => req("presentations", "DELETE", undefined, id),
};
