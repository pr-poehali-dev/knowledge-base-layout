import { useState } from "react";
import Icon from "@/components/ui/icon";

const AUTH_URL = "https://functions.poehali.dev/ae83f468-2bd3-419a-a5bf-c1b12d8b3c79";

interface LoginProps {
  onSuccess: () => void;
}

export default function Login({ onSuccess }: LoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.ok && data.token) {
        localStorage.setItem("kb_token", data.token);
        onSuccess();
      } else {
        setError("Неверный пароль. Обратитесь к администратору.");
        setPassword("");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--beige))] flex items-center justify-center p-4 font-golos">
      {/* Фоновый паттерн */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,hsl(350,60%,28%),hsl(350,60%,28%)_1px,transparent_1px,transparent_40px)]" />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Логотип */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--burgundy))] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Icon name="BookOpen" size={28} className="text-white" />
          </div>
          <h1 className="font-cormorant text-3xl font-semibold text-[hsl(var(--foreground))]">
            База знаний
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            Внутренний корпоративный портал
          </p>
        </div>

        {/* Форма */}
        <div className="bg-white rounded-2xl border border-border shadow-xl p-8">
          <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-1">
            Введите пароль для входа
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-6">
            Пароль выдаётся администратором компании при трудоустройстве
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Icon
                name="Lock"
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Корпоративный пароль"
                autoFocus
                className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all font-golos ${
                  error
                    ? "border-red-300 bg-red-50 focus:ring-red-200"
                    : "border-border bg-[hsl(var(--beige))] focus:ring-[hsl(var(--burgundy))]/20 focus:border-[hsl(var(--burgundy))]/40"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={15} />
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                <Icon name="AlertCircle" size={14} className="flex-shrink-0" />
                <p className="text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[hsl(var(--burgundy))] text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Проверяем…
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} />
                  Войти
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-6">
          Проблемы со входом? Напишите в{" "}
          <a href="mailto:it-help@company.ru" className="text-[hsl(var(--burgundy))] hover:underline">
            IT-поддержку
          </a>
        </p>
      </div>
    </div>
  );
}
