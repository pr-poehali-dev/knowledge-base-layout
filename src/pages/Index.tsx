import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { publicApi } from "@/lib/publicApi";

const menuItems = [
  { id: 1, icon: "BookOpen", label: "Как пользоваться БЗ", path: "/guide" },
  { id: 2, icon: "Building2", label: "О компании", path: "/about" },
  { id: 3, icon: "HelpCircle", label: "К кому обращаться, если…", path: "/contacts" },
  { id: 4, icon: "BookMarked", label: "Справочник", path: "/reference" },
  { id: 5, icon: "Library", label: "Библиотека", path: "/library" },
  { id: 6, icon: "FileText", label: "Документы", path: "/documents" },
  { id: 7, icon: "Presentation", label: "Презентации", path: "/presentations" },
];

const newsItems = [
  {
    id: 1,
    date: "3 июня 2026",
    category: "Важно",
    title: "Утверждена новая структура отдела продаж",
    excerpt:
      "Руководство компании объявило об обновлении организационной структуры. Все изменения вступают в силу с 10 июня.",
    author: "HR-отдел",
  },
  {
    id: 2,
    date: "1 июня 2026",
    category: "Мероприятия",
    title: "Корпоративный тренинг по управлению проектами — 15 июня",
    excerpt:
      "Приглашаем всех сотрудников на однодневный тренинг. Регистрация открыта до 8 июня.",
    author: "Отдел обучения",
  },
  {
    id: 3,
    date: "28 мая 2026",
    category: "IT",
    title: "Обновление корпоративного портала до версии 3.2",
    excerpt:
      "В новой версии ускорена загрузка страниц, добавлен поиск по документам и улучшен интерфейс мобильной версии.",
    author: "IT-департамент",
  },
  {
    id: 4,
    date: "25 мая 2026",
    category: "Финансы",
    title: "Изменены сроки подачи авансовых отчётов",
    excerpt:
      "С 1 июля авансовые отчёты необходимо подавать не позднее 3 рабочих дней после командировки.",
    author: "Бухгалтерия",
  },
  {
    id: 5,
    date: "20 мая 2026",
    category: "Кадры",
    title: "Приветствуем новых сотрудников в нашей команде",
    excerpt:
      "В мае к нам присоединились 7 новых специалистов. Познакомьтесь с ними в разделе «О компании».",
    author: "HR-отдел",
  },
];

const updates = [
  {
    id: 1,
    section: "Документы",
    icon: "FileText",
    title: "Обновлён шаблон NDA для партнёров",
    time: "сегодня, 14:22",
  },
  {
    id: 2,
    section: "Справочник",
    icon: "BookMarked",
    title: "Добавлены контакты регионального офиса",
    time: "вчера, 11:05",
  },
  {
    id: 3,
    section: "Презентации",
    icon: "Presentation",
    title: "Новая презентация продуктовой линейки 2026",
    time: "2 июня, 16:40",
  },
  {
    id: 4,
    section: "Библиотека",
    icon: "Library",
    title: "Добавлена книга «Agile для руководителей»",
    time: "1 июня, 09:15",
  },
];

const categoryColors: Record<string, string> = {
  Важно: "bg-[hsl(350,60%,28%)] text-[hsl(36,33%,96%)]",
  Мероприятия: "bg-[hsl(36,20%,80%)] text-[hsl(0,15%,18%)]",
  IT: "bg-[hsl(210,30%,80%)] text-[hsl(0,15%,18%)]",
  Финансы: "bg-[hsl(130,20%,78%)] text-[hsl(0,15%,18%)]",
  Кадры: "bg-[hsl(36,40%,85%)] text-[hsl(0,15%,18%)]",
};

interface IndexProps {
  onLogout?: () => void;
}

export default function Index({ onLogout }: IndexProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [dbNews, setDbNews] = useState<typeof newsItems | null>(null);

  useEffect(() => {
    publicApi.getNews().then((data: Array<{id: number; title: string; excerpt: string; category: string; published_at: string}>) => {
      if (Array.isArray(data) && data.length > 0) {
        setDbNews(data.map(n => ({
          id: n.id,
          title: n.title,
          excerpt: n.excerpt || "",
          category: n.category,
          author: "",
          date: new Date(n.published_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
        })));
      }
    }).catch(() => {});
  }, []);

  const displayNews = dbNews ?? newsItems;

  return (
    <div className="min-h-screen bg-[hsl(var(--beige))] font-golos">
      {/* Шапка */}
      <header className="bg-[hsl(var(--burgundy))] text-[hsl(var(--primary-foreground))] px-8 py-4 flex items-center justify-between shadow-md animate-fade-in">
        <div className="flex items-center gap-3">
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
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-sm text-white/80 cursor-pointer hover:bg-white/20 transition-colors">
            <Icon name="User" size={15} className="text-white/70" />
            <span>Сотрудник</span>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full px-3 py-1.5 text-sm transition-colors"
            >
              <Icon name="LogOut" size={14} />
              <span>Выйти</span>
            </button>
          )}
        </div>
      </header>

      {/* Строка поиска */}
      <div className="bg-[hsl(var(--burgundy))] pb-8 pt-6 px-8 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <p className="text-white/60 text-center mb-3 font-golos tracking-widest text-xs uppercase">
            Найдите нужную информацию
          </p>
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Поиск по базе знаний…"
              className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-white border border-white/20 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg font-golos"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            {["Инструкции", "Контакты", "Шаблоны", "Регламенты"].map((tag) => (
              <button
                key={tag}
                className="text-xs text-white/60 hover:text-white px-3 py-1 rounded-full border border-white/20 hover:border-white/40 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Левая колонка — меню + свежие обновления */}
          <aside className="w-[220px] flex-shrink-0">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-fade-in-up">
              <div className="px-4 py-3 border-b border-border bg-[hsl(var(--beige-dark))]">
                <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                  Разделы
                </span>
              </div>
              <nav className="p-2">
                {menuItems.map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => { setActiveMenu(item.id); navigate(item.path); }}
                    style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                    className={`menu-item animate-fade-in-up ${activeMenu === item.id ? "active" : ""}`}
                  >
                    <Icon
                      name={item.icon}
                      size={16}
                      className={
                        activeMenu === item.id
                          ? "text-white"
                          : "text-[hsl(var(--burgundy))]"
                      }
                      fallback="FileText"
                    />
                    <span className="leading-tight">{item.label}</span>
                  </div>
                ))}
              </nav>
            </div>

            {/* Свежие обновления */}
            <div className="mt-5 bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="px-4 py-3 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--burgundy))]" style={{ animation: "pulse 2s infinite" }} />
                <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                  Свежие обновления
                </span>
              </div>
              <div className="p-3">
                {updates.map((upd) => (
                  <div key={upd.id} className="update-item">
                    <div className="w-7 h-7 rounded-md bg-[hsl(var(--burgundy-pale))] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon
                        name={upd.icon}
                        size={13}
                        className="text-[hsl(var(--burgundy))]"
                        fallback="FileText"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="update-title text-xs font-medium text-[hsl(var(--foreground))] leading-snug line-clamp-2 transition-colors duration-200">
                        {upd.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-[hsl(var(--burgundy))] font-medium">
                          {upd.section}
                        </span>
                        <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                          · {upd.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Центральная колонка — новостная лента */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    name="Newspaper"
                    size={16}
                    className="text-[hsl(var(--burgundy))]"
                  />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                    Новостная лента
                  </span>
                </div>
                <button className="text-xs text-[hsl(var(--burgundy))] hover:underline font-medium">
                  Все новости →
                </button>
              </div>
              <div className="divide-y divide-border">
                {displayNews.map((item, i) => (
                  <article
                    key={item.id}
                    style={{ animationDelay: `${0.2 + i * 0.06}s` }}
                    className="px-6 py-5 hover:bg-[hsl(var(--beige))] transition-colors duration-200 cursor-pointer animate-fade-in-up"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-center w-12">
                        <div className="text-[hsl(var(--burgundy))] text-lg font-cormorant font-semibold leading-none">
                          {item.date.split(" ")[0]}
                        </div>
                        <div className="text-[hsl(var(--muted-foreground))] text-[10px] uppercase tracking-wide mt-0.5">
                          {item.date.split(" ")[1]}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide ${categoryColors[item.category] || "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"}`}
                          >
                            {item.category}
                          </span>
                          <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                            {item.author}
                          </span>
                        </div>
                        <h3 className="news-title text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5 leading-snug transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                      <Icon
                        name="ChevronRight"
                        size={16}
                        className="text-[hsl(var(--muted-foreground))] flex-shrink-0 mt-1"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </main>


        </div>
      </div>

      {/* Подвал */}
      <footer className="border-t border-border mt-4 py-5 px-8 animate-fade-in">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              name="BookOpen"
              size={14}
              className="text-[hsl(var(--burgundy))]"
            />
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              База знаний компании
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              Последнее обновление: 4 июня 2026
            </span>
            <button className="text-xs text-[hsl(var(--burgundy))] hover:underline">
              Сообщить об ошибке
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}