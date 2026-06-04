import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const books = [
  {
    id: 1, title: "Agile для руководителей", author: "Майк Кон", year: 2023,
    category: "Управление", pages: 320, new: true,
    desc: "Практическое руководство по внедрению гибких методологий в корпоративной среде.",
  },
  {
    id: 2, title: "Пять пороков команды", author: "Патрик Ленсиони", year: 2022,
    category: "Командная работа", pages: 240, new: false,
    desc: "Бизнес-притча о том, почему команды не работают эффективно и как это исправить.",
  },
  {
    id: 3, title: "Сначала нарушьте все правила", author: "Маркус Бакингем", year: 2022,
    category: "HR", pages: 280, new: false,
    desc: "Исследование на основе интервью с 80 000 менеджеров — что отличает великих руководителей.",
  },
  {
    id: 4, title: "Scrum. Революционный метод", author: "Джефф Сазерленд", year: 2023,
    category: "Управление", pages: 288, new: false,
    desc: "Как методология Scrum помогает вдвое сократить время на выполнение проектов.",
  },
  {
    id: 5, title: "Эффективное мышление", author: "Эдвард Теннер", year: 2024,
    category: "Саморазвитие", pages: 208, new: true,
    desc: "Инструменты для принятия качественных решений в условиях неопределённости.",
  },
  {
    id: 6, title: "Переговоры без поражения", author: "Роджер Фишер", year: 2021,
    category: "Коммуникации", pages: 256, new: false,
    desc: "Метод Гарвардской школы: как приходить к взаимовыгодным соглашениям.",
  },
];

const categories = ["Все", "Управление", "HR", "Командная работа", "Саморазвитие", "Коммуникации"];

const catColors: Record<string, string> = {
  Управление: "bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)]",
  HR: "bg-[hsl(36,40%,88%)] text-[hsl(36,50%,30%)]",
  "Командная работа": "bg-[hsl(130,20%,88%)] text-[hsl(130,30%,28%)]",
  Саморазвитие: "bg-[hsl(280,20%,90%)] text-[hsl(280,30%,30%)]",
  Коммуникации: "bg-[hsl(350,30%,90%)] text-[hsl(350,50%,30%)]",
};

export default function Library() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все" ? books : books.filter((b) => b.category === activeCategory);

  return (
    <Layout title="Библиотека" subtitle="Корпоративная коллекция книг и материалов" icon="Library">
      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              activeCategory === cat
                ? "bg-[hsl(var(--burgundy))] text-white border-[hsl(var(--burgundy))]"
                : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--burgundy))] hover:text-[hsl(var(--burgundy))]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Книги */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex gap-4 p-5">
              {/* Обложка-заглушка */}
              <div className="w-14 h-20 rounded-md bg-[hsl(var(--burgundy))] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_8px)]" />
                <Icon name="BookOpen" size={20} className="text-white/80" />
                {book.new && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[hsl(36,100%,65%)]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] leading-snug group-hover:text-[hsl(var(--burgundy))] transition-colors">
                    {book.title}
                  </h3>
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">{book.author} · {book.year}</p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2 mb-3">
                  {book.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${catColors[book.category] || ""}`}>
                    {book.category}
                  </span>
                  <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{book.pages} стр.</span>
                  {book.new && (
                    <span className="text-[10px] font-semibold text-[hsl(36,80%,45%)]">Новинка</span>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-border px-5 py-2.5 flex items-center justify-between bg-[hsl(var(--beige-dark))]">
              <button className="text-xs text-[hsl(var(--burgundy))] font-medium hover:underline flex items-center gap-1.5">
                <Icon name="Download" size={12} />
                Скачать PDF
              </button>
              <button className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-1">
                <Icon name="Bookmark" size={12} />
                Сохранить
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
