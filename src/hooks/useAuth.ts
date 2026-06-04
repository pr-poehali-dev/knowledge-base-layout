import { useState, useEffect } from "react";

const AUTH_URL = "https://functions.poehali.dev/ae83f468-2bd3-419a-a5bf-c1b12d8b3c79";
const TOKEN_KEY = "kb_token";

export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // null = проверяем

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsAuth(false);
      return;
    }
    // Проверяем токен на сервере
    fetch(`${AUTH_URL}?token=${token}`)
      .then((r) => r.json())
      .then((data) => setIsAuth(data.valid === true))
      .catch(() => setIsAuth(false));
  }, []);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuth(false);
  };

  const login = () => setIsAuth(true);

  return { isAuth, login, logout };
}
