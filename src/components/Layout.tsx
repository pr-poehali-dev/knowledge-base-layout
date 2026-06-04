import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/ui/icon";

const menuItems = [
  { id: 1, icon: "BookOpen", label: "Как пользоваться БЗ", path: "/guide" },
  { id: 2, icon: "Building2", label: "О компании", path: "/about" },
  { id: 3, icon: "HelpCircle", label: "К кому обращаться, если…", path: "/contacts" },
  { id: 4, icon: "BookMarked", label: "Справочник", path: "/reference" },
  { id: 5, icon: "Library", label: "Библиотека", path: "/library" },
  { id: 6, icon: "FileText", label: "Документы", path: "/documents" },
  { id: 7, icon: "Presentation", label: "Презентации", path: "/presentations" },
];

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  icon?: string;
}

export default function Layout({ children, title, subtitle, icon = "FileText" }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[hsl(var(--beige))] font-golos">
      {/* Шапка */}
      <header className="bg-[hsl(var(--burgundy))] text-[hsl(var(--primary-foreground))] px-8 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center">
              <Icon name="BookOpen" size={18} className="text-white" />
            </div>
            <div>
              <span className="font-cormorant text-xl font-semibold tracking-wide">
                База знаний
              </span>
              <span className="text-white/50 mx-2 text-xs">|</span>
              <span className="text-white/70 text-sm">Внутренний портал</span>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-sm text-white/80 cursor-pointer hover:bg-white/20 transition-colors">
            <Icon name="User" size={15} className="text-white/70" />
            <span>Сотрудник</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full px-3 py-1.5 text-sm transition-colors"
          >
            <Icon name="LogOut" size={14} />
            <span>Выйти</span>
          </button>
        </div>
      </header>

      {/* Подзаголовок раздела */}
      <div className="bg-[hsl(var(--burgundy))] pb-6 pt-5 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <button onClick={() => navigate("/")} className="hover:text-white/80 transition-colors">
              Главная
            </button>
            <Icon name="ChevronRight" size={12} />
            <span className="text-white/80">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
              <Icon name={icon} size={18} className="text-white" fallback="FileText" />
            </div>
            <div>
              <h1 className="font-cormorant text-2xl font-semibold text-white leading-none">{title}</h1>
              {subtitle && <p className="text-white/60 text-xs mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {/* Поиск в разделе */}
          <div className="relative mt-4 max-w-lg">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={`Поиск в разделе «${title}»…`}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border border-white/20 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] text-xs focus:outline-none focus:ring-2 focus:ring-white/30 shadow font-golos"
            />
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Боковое меню */}
          <aside className="w-[220px] flex-shrink-0">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden sticky top-6">
              <div className="px-4 py-3 border-b border-border bg-[hsl(var(--beige-dark))]">
                <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                  Разделы
                </span>
              </div>
              <nav className="p-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`menu-item w-full text-left ${isActive ? "active" : ""}`}
                    >
                      <Icon
                        name={item.icon}
                        size={16}
                        className={isActive ? "text-white" : "text-[hsl(var(--burgundy))]"}
                        fallback="FileText"
                      />
                      <span className="leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-border">
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--burgundy))] transition-colors"
                >
                  <Icon name="Home" size={13} />
                  <span>На главную</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Контент страницы */}
          <main className="flex-1 min-w-0 animate-fade-in-up">
            {children}
          </main>
        </div>
      </div>

      {/* Подвал */}
      <footer className="border-t border-border mt-4 py-5 px-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="BookOpen" size={14} className="text-[hsl(var(--burgundy))]" />
            <span className="text-xs text-[hsl(var(--muted-foreground))]">База знаний компании</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">Последнее обновление: 4 июня 2026</span>
            <button className="text-xs text-[hsl(var(--burgundy))] hover:underline">Сообщить об ошибке</button>
          </div>
        </div>
      </footer>
    </div>
  );
}