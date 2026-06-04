import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const presentations = [
  {
    id: 1, title: "Продуктовая линейка 2026", category: "Продукты",
    slides: 42, updated: "02.06.2026", size: "18.4 МБ", new: true,
    desc: "Полный обзор продуктового портфеля компании на 2026 год для внутреннего использования.",
    author: "Отдел маркетинга",
  },
  {
    id: 2, title: "Итоги I квартала 2026", category: "Финансы",
    slides: 28, updated: "15.04.2026", size: "9.1 МБ", new: false,
    desc: "Финансовые результаты, ключевые метрики и аналитика за январь–март 2026.",
    author: "Финансовый отдел",
  },
  {
    id: 3, title: "Стратегия на 2026–2027", category: "Стратегия",
    slides: 56, updated: "01.02.2026", size: "24.7 МБ", new: false,
    desc: "Долгосрочный план развития компании, ключевые направления и цели.",
    author: "Генеральный директор",
  },
  {
    id: 4, title: "Корпоративные ценности", category: "HR",
    slides: 16, updated: "10.01.2026", size: "5.3 МБ", new: false,
    desc: "Презентация миссии, видения и корпоративных ценностей для онбординга.",
    author: "HR-отдел",
  },
  {
    id: 5, title: "Введение в продукт для партнёров", category: "Продажи",
    slides: 22, updated: "20.03.2026", size: "11.2 МБ", new: false,
    desc: "Обзорная презентация для новых партнёров и дистрибьюторов.",
    author: "Отдел продаж",
  },
  {
    id: 6, title: "IT-архитектура платформы", category: "IT",
    slides: 34, updated: "15.03.2026", size: "7.8 МБ", new: false,
    desc: "Техническая документация по архитектуре корпоративной платформы.",
    author: "IT-департамент",
  },
];

const categories = ["Все", "Продукты", "Финансы", "Стратегия", "HR", "Продажи", "IT"];

const catColors: Record<string, string> = {
  Продукты: "bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)]",
  Финансы: "bg-[hsl(130,20%,88%)] text-[hsl(130,30%,28%)]",
  Стратегия: "bg-[hsl(350,30%,90%)] text-[hsl(350,50%,30%)]",
  HR: "bg-[hsl(36,40%,88%)] text-[hsl(36,50%,30%)]",
  Продажи: "bg-[hsl(45,60%,88%)] text-[hsl(45,60%,28%)]",
  IT: "bg-[hsl(280,20%,90%)] text-[hsl(280,30%,30%)]",
};

export default function Presentations() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все" ? presentations : presentations.filter((p) => p.category === activeCategory);

  return (
    <Layout title="Презентации" subtitle="Корпоративные слайды и материалы для встреч" icon="Presentation">
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

      {/* Карточки презентаций */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((pres) => (
          <div
            key={pres.id}
            className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
          >
            {/* Превью */}
            <div className="h-24 bg-[hsl(var(--burgundy))] relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,white,white_1px,transparent_1px,transparent_24px)]" />
              <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,white,white_1px,transparent_1px,transparent_48px)]" />
              <Icon name="Presentation" size={28} className="text-white/50" />
              {pres.new && (
                <span className="absolute top-2 right-2 text-[10px] font-bold bg-[hsl(36,100%,65%)] text-white px-2 py-0.5 rounded-sm">
                  Новое
                </span>
              )}
              <div className="absolute bottom-2 right-2 text-white/40 text-xs font-cormorant">
                {pres.slides} слайдов
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] leading-snug group-hover:text-[hsl(var(--burgundy))] transition-colors">
                  {pres.title}
                </h3>
              </div>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2 mb-3">
                {pres.desc}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${catColors[pres.category] || ""}`}>
                  {pres.category}
                </span>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{pres.author}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[hsl(var(--muted-foreground))]">
                <span>{pres.updated} · {pres.size}</span>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-[hsl(var(--burgundy))] font-medium hover:underline">
                    <Icon name="Eye" size={11} />
                    Открыть
                  </button>
                  <button className="flex items-center gap-1 hover:text-[hsl(var(--foreground))] transition-colors">
                    <Icon name="Download" size={11} />
                    Скачать
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
