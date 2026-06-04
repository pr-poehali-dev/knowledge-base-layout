import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const platforms = [
  {
    id: 1,
    name: "ЛитРес",
    desc: "Крупнейшая электронная библиотека. Доступ к более 1 млн книг и аудиокниг на русском языке.",
    url: "https://www.litres.ru",
    icon: "BookOpen",
    color: "hsl(350,60%,28%)",
    tag: "Корпоративная подписка",
  },
  {
    id: 2,
    name: "Bookmate",
    desc: "Сервис чтения с удобным мобильным приложением. Художественная и деловая литература.",
    url: "https://bookmate.com",
    icon: "Tablet",
    color: "hsl(210,45%,40%)",
    tag: "Корпоративная подписка",
  },
  {
    id: 3,
    name: "eLibrary.ru",
    desc: "Научная электронная библиотека. Статьи, журналы, диссертации по праву, экономике, управлению.",
    url: "https://elibrary.ru",
    icon: "GraduationCap",
    color: "hsl(130,40%,35%)",
    tag: "Научная база",
  },
  {
    id: 4,
    name: "Корпоративный блог",
    desc: "Внутренние статьи, кейсы и исследования, подготовленные специалистами компании.",
    url: "#",
    icon: "FileEdit",
    color: "hsl(36,60%,40%)",
    tag: "Внутренний ресурс",
  },
];

const books = [
  {
    id: 1,
    title: "Agile для руководителей",
    author: "Майк Кон",
    year: 2023,
    direction: "Управление",
    desc: "Практическое руководство по внедрению гибких методологий в корпоративной среде.",
    new: true,
    url: "https://www.litres.ru",
  },
  {
    id: 2,
    title: "Пять пороков команды",
    author: "Патрик Ленсиони",
    year: 2022,
    direction: "Управление",
    desc: "Бизнес-притча о том, почему команды не работают эффективно и как это исправить.",
    new: false,
    url: "https://www.litres.ru",
  },
  {
    id: 3,
    title: "Коммерческая недвижимость: от А до Я",
    author: "Игорь Рыжов",
    year: 2023,
    direction: "Коммерческая недвижимость",
    desc: "Отраслевой справочник: аренда, продажа, оценка, девелопмент коммерческих объектов.",
    new: true,
    url: "https://elibrary.ru",
  },
  {
    id: 4,
    title: "Договорное право",
    author: "М. И. Брагинский, В. В. Витрянский",
    year: 2021,
    direction: "Юриспруденция",
    desc: "Фундаментальный труд по теории и практике российского договорного права.",
    new: false,
    url: "https://elibrary.ru",
  },
  {
    id: 5,
    title: "Переговоры без поражения",
    author: "Роджер Фишер",
    year: 2021,
    direction: "Коммуникации",
    desc: "Метод Гарвардской школы: как приходить к взаимовыгодным соглашениям.",
    new: false,
    url: "https://bookmate.com",
  },
  {
    id: 6,
    title: "Сначала нарушьте все правила",
    author: "Маркус Бакингем",
    year: 2022,
    direction: "Менеджмент",
    desc: "Что отличает великих руководителей — исследование на основе 80 000 интервью.",
    new: false,
    url: "https://bookmate.com",
  },
  {
    id: 7,
    title: "Scrum. Революционный метод",
    author: "Джефф Сазерленд",
    year: 2023,
    direction: "Управление",
    desc: "Как методология Scrum помогает вдвое сократить время на выполнение проектов.",
    new: false,
    url: "https://www.litres.ru",
  },
  {
    id: 8,
    title: "Налоговое право России",
    author: "Ю. А. Крохина",
    year: 2022,
    direction: "Юриспруденция",
    desc: "Учебник по системе налогового права РФ для практикующих специалистов.",
    new: false,
    url: "https://elibrary.ru",
  },
];

const articles = [
  {
    id: 1,
    title: "Как мы автоматизировали документооборот: кейс IT-отдела",
    author: "IT-департамент",
    date: "15.05.2026",
    url: "#",
  },
  {
    id: 2,
    title: "5 принципов работы с клиентами в коммерческой недвижимости",
    author: "Отдел продаж",
    date: "02.04.2026",
    url: "#",
  },
  {
    id: 3,
    title: "Итоги корпоративного обучения 2025: что работает",
    author: "HR-отдел",
    date: "18.03.2026",
    url: "#",
  },
];

const directions = ["Все", "Управление", "Менеджмент", "Коммерческая недвижимость", "Юриспруденция", "Коммуникации"];

const dirColors: Record<string, string> = {
  Управление: "bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)]",
  Менеджмент: "bg-[hsl(280,20%,90%)] text-[hsl(280,30%,30%)]",
  "Коммерческая недвижимость": "bg-[hsl(36,40%,88%)] text-[hsl(36,50%,30%)]",
  Юриспруденция: "bg-[hsl(350,30%,90%)] text-[hsl(350,50%,30%)]",
  Коммуникации: "bg-[hsl(130,20%,88%)] text-[hsl(130,30%,28%)]",
};

const tagColors: Record<string, string> = {
  "Корпоративная подписка": "bg-[hsl(350,30%,90%)] text-[hsl(350,50%,30%)]",
  "Научная база": "bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)]",
  "Внутренний ресурс": "bg-[hsl(36,40%,88%)] text-[hsl(36,50%,30%)]",
};

export default function Library() {
  const [activeDirection, setActiveDirection] = useState("Все");

  const filteredBooks = activeDirection === "Все"
    ? books
    : books.filter((b) => b.direction === activeDirection);

  return (
    <Layout title="Электронная библиотека" subtitle="Ресурсы, подписки и рекомендованная литература" icon="Library">

      {/* Платформы — карточки с кнопкой «Перейти» */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Корпоративные платформы и подписки
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {platforms.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Иконка-шапка */}
              <div
                className="h-16 flex items-center justify-center"
                style={{ backgroundColor: p.color + "15" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: p.color }}
                >
                  <Icon name={p.icon} size={18} className="text-white" fallback="BookOpen" />
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1">{p.name}</p>
                <span className={`self-start text-[10px] font-medium px-2 py-0.5 rounded-sm mb-2 ${tagColors[p.tag] || ""}`}>
                  {p.tag}
                </span>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))] leading-relaxed flex-1 mb-3">
                  {p.desc}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium bg-[hsl(var(--burgundy))] text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Icon name="ExternalLink" size={12} />
                  Перейти
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Рекомендованная литература */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Рекомендованная литература
          </h2>
        </div>
        {/* Фильтры по направлениям */}
        <div className="flex flex-wrap gap-2 mb-4">
          {directions.map((dir) => (
            <button
              key={dir}
              onClick={() => setActiveDirection(dir)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                activeDirection === dir
                  ? "bg-[hsl(var(--burgundy))] text-white border-[hsl(var(--burgundy))]"
                  : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--burgundy))]/40 hover:text-[hsl(var(--burgundy))]"
              }`}
            >
              {dir}
            </button>
          ))}
        </div>
        {/* Список книг */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="divide-y divide-border">
            {filteredBooks.map((book) => (
              <div key={book.id} className="flex items-start gap-4 px-6 py-4 hover:bg-[hsl(var(--beige))] transition-colors group">
                {/* Обложка */}
                <div className="w-10 h-14 rounded-md bg-[hsl(var(--burgundy))] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_6px)]" />
                  <Icon name="BookOpen" size={14} className="text-white/70" />
                  {book.new && (
                    <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[hsl(36,100%,65%)]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--burgundy))] transition-colors">
                      {book.title}
                    </p>
                    {book.new && (
                      <span className="text-[10px] font-bold text-[hsl(36,80%,40%)]">Новинка</span>
                    )}
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
                    {book.author} · {book.year}
                  </p>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {book.desc}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${dirColors[book.direction] || ""}`}>
                    {book.direction}
                  </span>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[hsl(var(--burgundy))] font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="ExternalLink" size={11} />
                    Читать
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Внутренние статьи и кейсы */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Статьи и кейсы компании
          </h2>
          <button className="text-xs text-[hsl(var(--burgundy))] hover:underline font-medium">
            Все статьи →
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {articles.map((art) => (
            <a
              key={art.id}
              href={art.url}
              className="bg-white rounded-xl border border-border shadow-sm p-5 hover:shadow-md hover:border-[hsl(var(--burgundy))]/30 transition-all group block"
            >
              <div className="w-8 h-8 rounded-lg bg-[hsl(var(--burgundy-pale))] flex items-center justify-center mb-3">
                <Icon name="FileEdit" size={14} className="text-[hsl(var(--burgundy))]" />
              </div>
              <p className="text-sm font-semibold text-[hsl(var(--foreground))] leading-snug mb-2 group-hover:text-[hsl(var(--burgundy))] transition-colors">
                {art.title}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{art.author}</span>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{art.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
