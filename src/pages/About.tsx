import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const sections = ["Миссия и ценности", "История", "Структура", "Новости"];

const values = [
  { icon: "Star", label: "Качество", desc: "Мы не идём на компромисс с результатом — ни в продукте, ни в сервисе." },
  { icon: "Handshake", label: "Доверие", desc: "Открытость внутри команды и честность с клиентами — наш фундамент." },
  { icon: "Zap", label: "Скорость", desc: "Принимаем решения быстро, без лишней бюрократии и согласований." },
  { icon: "Heart", label: "Забота", desc: "О каждом сотруднике, клиенте и сообществе вокруг нас." },
];

const milestones = [
  { year: "2009", title: "Основание", text: "Первый офис в Москве, 12 сотрудников. Начало работы в сфере коммерческой недвижимости." },
  { year: "2012", title: "Рост", text: "Открытие второго направления. Команда выросла до 50 человек." },
  { year: "2015", title: "Регионы", text: "Филиал в Санкт-Петербурге. Выход на региональные рынки." },
  { year: "2018", title: "Технологии", text: "Запуск собственной IT-платформы. Автоматизация ключевых процессов." },
  { year: "2021", title: "Трансформация", text: "Переход на гибридный формат работы. Реструктуризация подразделений." },
  { year: "2024", title: "Сегодня", text: "Более 300 специалистов, 4 офиса, лидирующие позиции в отрасли." },
];

const departments = [
  { id: 1, name: "Генеральный директор", head: "Алексей Смирнов", icon: "Crown", people: 1, color: "hsl(350,60%,28%)", desc: "Стратегическое управление компанией, ключевые решения." },
  { id: 2, name: "Отдел продаж", head: "Марина Козлова", icon: "TrendingUp", people: 24, color: "hsl(210,45%,40%)", desc: "Работа с клиентами, заключение сделок, развитие клиентской базы." },
  { id: 3, name: "HR-отдел", head: "Наталья Петрова", icon: "Users", people: 8, color: "hsl(36,60%,40%)", desc: "Подбор персонала, адаптация, обучение, корпоративная культура." },
  { id: 4, name: "IT-департамент", head: "Дмитрий Волков", icon: "Monitor", people: 15, color: "hsl(150,40%,35%)", desc: "Разработка и поддержка платформы, IT-инфраструктура." },
  { id: 5, name: "Бухгалтерия", head: "Елена Новикова", icon: "Calculator", people: 6, color: "hsl(280,30%,40%)", desc: "Финансовая отчётность, расчёт зарплат, налоги." },
  { id: 6, name: "Маркетинг", head: "Сергей Фёдоров", icon: "Megaphone", people: 11, color: "hsl(20,60%,40%)", desc: "Реклама, PR, брендинг, digital-продвижение." },
  { id: 7, name: "Юридический", head: "Ольга Захарова", icon: "Scale", people: 4, color: "hsl(180,35%,35%)", desc: "Договорная работа, юридическое сопровождение." },
];

const news = [
  { date: "03.06.2026", category: "Важно", title: "Утверждена новая структура отдела продаж", text: "С 10 июня вступают в силу изменения в орг. структуре. Подробности — у HR." },
  { date: "28.05.2026", category: "Мероприятия", title: "Корпоратив 20 июня — регистрация открыта", text: "Летний корпоратив пройдёт в загородном клубе. Зарегистрируйтесь до 10 июня." },
  { date: "15.05.2026", category: "Кадры", title: "7 новых сотрудников присоединились к команде", text: "Встречайте коллег из отделов продаж, IT и маркетинга." },
  { date: "01.05.2026", category: "Компания", title: "Компании исполнилось 17 лет", text: "Поздравляем всю команду! В честь юбилея — корпоративный подарок каждому сотруднику." },
];

const catColors: Record<string, string> = {
  Важно: "bg-[hsl(350,60%,28%)] text-white",
  Мероприятия: "bg-[hsl(36,40%,82%)] text-[hsl(36,50%,25%)]",
  Кадры: "bg-[hsl(130,20%,82%)] text-[hsl(130,30%,25%)]",
  Компания: "bg-[hsl(210,35%,82%)] text-[hsl(210,45%,25%)]",
};

export default function About() {
  const [activeSection, setActiveSection] = useState("Миссия и ценности");
  const [hoveredDept, setHoveredDept] = useState<number | null>(null);

  return (
    <Layout title="О компании" subtitle="Миссия, история, структура и новости" icon="Building2">
      {/* Вертикальное меню + контент */}
      <div className="flex gap-5">
        {/* Меню разделов */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden sticky top-6">
            <div className="px-4 py-3 border-b border-border bg-[hsl(var(--beige-dark))]">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                Навигация
              </span>
            </div>
            <nav className="p-2">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-medium transition-all mb-0.5 ${
                    activeSection === s
                      ? "bg-[hsl(var(--burgundy))] text-white"
                      : "text-[hsl(var(--foreground))]/70 hover:bg-[hsl(var(--burgundy-pale))] hover:text-[hsl(var(--burgundy))]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Контент */}
        <div className="flex-1 min-w-0">

          {/* Миссия и ценности */}
          {activeSection === "Миссия и ценности" && (
            <div className="space-y-5">
              <div className="bg-[hsl(var(--burgundy))] rounded-xl p-6 text-white">
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-3">Миссия</p>
                <p className="font-cormorant text-2xl font-medium leading-snug mb-4">
                  «Создавать решения, которые меняют жизнь людей к лучшему — через профессионализм, технологии и заботу.»
                </p>
                <div className="border-t border-white/20 pt-4 mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-2">Видение</p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Стать компанией, которой доверяют клиенты, гордятся сотрудники и уважают партнёры — 
                    в каждом городе присутствия.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {values.map((v) => (
                  <div key={v.label} className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[hsl(var(--burgundy-pale))] flex items-center justify-center">
                        <Icon name={v.icon} size={16} className="text-[hsl(var(--burgundy))]" fallback="Star" />
                      </div>
                      <p className="font-semibold text-sm text-[hsl(var(--foreground))]">{v.label}</p>
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* История */}
          {activeSection === "История" && (
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))]">
                <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                  Ключевые вехи
                </span>
              </div>
              {/* Горизонтальная лента */}
              <div className="p-6 overflow-x-auto">
                <div className="flex gap-0 min-w-max">
                  {milestones.map((m, i) => (
                    <div key={m.year} className="flex flex-col items-center" style={{ width: 160 }}>
                      {/* Контент вверху */}
                      <div className="w-full px-3 pb-4 text-center">
                        <div className="font-cormorant text-2xl font-bold text-[hsl(var(--burgundy))] leading-none mb-1">{m.year}</div>
                        <div className="text-xs font-semibold text-[hsl(var(--foreground))] mb-1">{m.title}</div>
                        <div className="text-[11px] text-[hsl(var(--muted-foreground))] leading-snug">{m.text}</div>
                      </div>
                      {/* Линия и точка */}
                      <div className="flex items-center w-full relative">
                        <div className={`h-px flex-1 bg-[hsl(var(--border))] ${i === 0 ? "opacity-0" : ""}`} />
                        <div className="w-4 h-4 rounded-full bg-[hsl(var(--burgundy))] border-2 border-white shadow flex-shrink-0 z-10" />
                        <div className={`h-px flex-1 bg-[hsl(var(--border))] ${i === milestones.length - 1 ? "opacity-0" : ""}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Вертикальный список под лентой */}
              <div className="divide-y divide-border border-t border-border">
                {milestones.map((m) => (
                  <div key={m.year} className="flex items-start gap-4 px-6 py-4 hover:bg-[hsl(var(--beige))] transition-colors">
                    <div className="font-cormorant text-lg font-bold text-[hsl(var(--burgundy))] w-12 flex-shrink-0 pt-0.5">{m.year}</div>
                    <div>
                      <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-0.5">{m.title}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Структура */}
          {activeSection === "Структура" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-[hsl(var(--burgundy-pale))] border border-[hsl(var(--burgundy))]/20 rounded-xl p-4">
                <Icon name="Info" size={15} className="text-[hsl(var(--burgundy))] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[hsl(var(--foreground))]/80">
                  Наведите курсор на карточку отдела, чтобы узнать его функции. Актуально на 04.06.2026.
                </p>
              </div>
              {/* Схема отделов */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                {/* Гендиректор */}
                <div className="flex justify-center mb-6">
                  <div
                    onMouseEnter={() => setHoveredDept(1)}
                    onMouseLeave={() => setHoveredDept(null)}
                    className="relative bg-[hsl(var(--burgundy))] text-white rounded-xl px-6 py-4 text-center cursor-pointer shadow-md hover:shadow-lg transition-shadow w-56"
                  >
                    <Icon name="Crown" size={18} className="text-white/70 mx-auto mb-1" />
                    <p className="text-sm font-semibold">Генеральный директор</p>
                    <p className="text-xs text-white/70">Алексей Смирнов</p>
                    {hoveredDept === 1 && (
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[hsl(var(--foreground))] text-white text-xs rounded-lg p-3 w-52 z-10 shadow-xl text-left">
                        {departments[0].desc}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[hsl(var(--foreground))] rotate-45" />
                      </div>
                    )}
                  </div>
                </div>
                {/* Линия вниз */}
                <div className="flex justify-center mb-4">
                  <div className="w-px h-6 bg-[hsl(var(--border))]" />
                </div>
                {/* Горизонтальная линия */}
                <div className="relative flex justify-center mb-4">
                  <div className="absolute top-0 left-[10%] right-[10%] h-px bg-[hsl(var(--border))]" />
                </div>
                {/* Отделы */}
                <div className="grid grid-cols-3 gap-3">
                  {departments.slice(1).map((dep) => (
                    <div
                      key={dep.id}
                      onMouseEnter={() => setHoveredDept(dep.id)}
                      onMouseLeave={() => setHoveredDept(null)}
                      className="relative bg-white border border-border rounded-lg p-4 text-center cursor-pointer hover:border-[hsl(var(--burgundy))]/40 hover:shadow-md transition-all group"
                    >
                      <div className="w-9 h-9 rounded-lg mx-auto mb-2 flex items-center justify-center"
                        style={{ backgroundColor: dep.color + "20" }}>
                        <Icon name={dep.icon} size={16} className="text-[hsl(var(--burgundy))]" fallback="Users" />
                      </div>
                      <p className="text-xs font-semibold text-[hsl(var(--foreground))] leading-snug mb-0.5">{dep.name}</p>
                      <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{dep.head}</p>
                      <div className="mt-1.5 text-[10px] text-[hsl(var(--burgundy))] font-semibold">
                        {dep.people} чел.
                      </div>
                      {hoveredDept === dep.id && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[hsl(var(--foreground))] text-white text-xs rounded-lg p-3 w-48 z-10 shadow-xl text-left">
                          {dep.desc}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[hsl(var(--foreground))] rotate-45" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Новости */}
          {activeSection === "Новости" && (
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                  Последние события
                </span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Все новости на главной</span>
              </div>
              <div className="divide-y divide-border">
                {news.map((item, i) => (
                  <div key={i} className="px-6 py-5 hover:bg-[hsl(var(--beige))] transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="text-center w-12 flex-shrink-0">
                        <div className="font-cormorant text-xl font-bold text-[hsl(var(--burgundy))] leading-none">
                          {item.date.split(".")[0]}
                        </div>
                        <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                          {["", "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"][parseInt(item.date.split(".")[1])]}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${catColors[item.category] || ""}`}>
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1 leading-snug">{item.title}</h3>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{item.text}</p>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-[hsl(var(--muted-foreground))] flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
