import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import { publicApi } from "@/lib/publicApi";

interface Presentation {
  id: number;
  title: string;
  category: string;
  audience: "internal" | "external";
  slides: number;
  updated: string;
  size: string;
  author: string;
  desc: string;
  isNew: boolean;
  accent: string;
  slidePattern: "grid" | "lines" | "dots" | "diagonal";
}

const presentations: Presentation[] = [
  {
    id: 1,
    title: "О компании для клиентов",
    category: "Внешние",
    audience: "external",
    slides: 24,
    updated: "01.06.2026",
    size: "14.2 МБ",
    author: "Отдел маркетинга",
    desc: "Представительская презентация компании для клиентов и партнёров. История, ценности, ключевые объекты.",
    isNew: false,
    accent: "hsl(350,60%,28%)",
    slidePattern: "grid",
  },
  {
    id: 2,
    title: "Стратегия на 2026–2027",
    category: "Стратегия",
    audience: "internal",
    slides: 56,
    updated: "01.02.2026",
    size: "24.7 МБ",
    author: "Генеральный директор",
    desc: "Долгосрочный план развития компании: приоритетные направления, KPI, финансовые цели.",
    isNew: false,
    accent: "hsl(210,45%,38%)",
    slidePattern: "lines",
  },
  {
    id: 3,
    title: "Объекты коммерческой недвижимости",
    category: "Внешние",
    audience: "external",
    slides: 38,
    updated: "02.06.2026",
    size: "31.5 МБ",
    author: "Отдел продаж",
    desc: "Каталог объектов: бизнес-центры (БЦ), торговые центры (ТЦ) и торгово-досуговые комплексы (ТДЦ). Планировки, фото, условия аренды.",
    isNew: true,
    accent: "hsl(36,60%,38%)",
    slidePattern: "diagonal",
  },
  {
    id: 4,
    title: "Итоги I квартала 2026",
    category: "Финансы",
    audience: "internal",
    slides: 28,
    updated: "15.04.2026",
    size: "9.1 МБ",
    author: "Финансовый отдел",
    desc: "Финансовые результаты, ключевые метрики, сравнение план/факт за январь–март 2026.",
    isNew: false,
    accent: "hsl(130,40%,35%)",
    slidePattern: "dots",
  },
  {
    id: 5,
    title: "Корпоративные ценности",
    category: "HR",
    audience: "internal",
    slides: 16,
    updated: "10.01.2026",
    size: "5.3 МБ",
    author: "HR-отдел",
    desc: "Миссия, видение и ценности компании. Используется в онбординге новых сотрудников.",
    isNew: false,
    accent: "hsl(280,30%,40%)",
    slidePattern: "grid",
  },
  {
    id: 6,
    title: "Введение в продукт для партнёров",
    category: "Внешние",
    audience: "external",
    slides: 22,
    updated: "20.03.2026",
    size: "11.2 МБ",
    author: "Отдел продаж",
    desc: "Обзорная презентация для новых партнёров и дистрибьюторов.",
    isNew: false,
    accent: "hsl(20,60%,38%)",
    slidePattern: "lines",
  },
];

const brandRules = [
  {
    icon: "Type",
    title: "Шрифты",
    rules: ["Заголовки: Golos Text 700, 28–36 pt", "Подзаголовки: Golos Text 600, 20–24 pt", "Основной текст: Golos Text 400, 14–16 pt", "Не использовать более 2 гарнитур"],
  },
  {
    icon: "Palette",
    title: "Цвета",
    rules: ["Основной: #6B1E2A (бордовый)", "Вторичный: #F5EEE6 (бежевый)", "Текст: #2E1A1A", "Акцент: только белый или бежевый на бордовом"],
  },
  {
    icon: "Layout",
    title: "Макет",
    rules: ["Поля: не менее 40 pt со всех сторон", "Логотип — всегда в правом верхнем углу", "Номер слайда — внизу по центру", "Не более 5 строк текста на слайде"],
  },
  {
    icon: "Image",
    title: "Изображения",
    rules: ["Только высокое разрешение (300 dpi+)", "Без водяных знаков и стоковых клипартов", "Фотографии — реальные объекты компании", "Разрешено: фото персонала с согласия"],
  },
];

const catColors: Record<string, string> = {
  Внешние:  "bg-[hsl(350,30%,90%)] text-[hsl(350,50%,30%)]",
  Стратегия: "bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)]",
  Финансы:  "bg-[hsl(130,20%,88%)] text-[hsl(130,30%,28%)]",
  HR:       "bg-[hsl(36,40%,88%)] text-[hsl(36,50%,30%)]",
};

const patternStyle: Record<string, string> = {
  grid:     "bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.07),rgba(255,255,255,0.07)_1px,transparent_1px,transparent_20px)] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.07),rgba(255,255,255,0.07)_1px,transparent_1px,transparent_40px)]",
  lines:    "bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_1px,transparent_1px,transparent_14px)]",
  dots:     "bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:16px_16px]",
  diagonal: "bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_1px,transparent_1px,transparent_12px)]",
};

interface PreviewModalProps {
  pres: Presentation;
  onClose: () => void;
}

function PreviewModal({ pres, onClose }: PreviewModalProps) {
  const mockSlides = Array.from({ length: Math.min(pres.slides, 9) }, (_, i) => i + 1);
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))]">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold">Предпросмотр</p>
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{pres.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-medium bg-[hsl(var(--burgundy))] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              <Icon name="Download" size={13} />
              Скачать PPTX
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-[hsl(var(--beige))] flex items-center justify-center hover:bg-[hsl(var(--border))] transition-colors">
              <Icon name="X" size={14} className="text-[hsl(var(--muted-foreground))]" />
            </button>
          </div>
        </div>
        {/* Сетка слайдов */}
        <div className="overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-3">
            {mockSlides.map((num) => (
              <div
                key={num}
                className="aspect-video rounded-lg overflow-hidden border border-border cursor-pointer hover:border-[hsl(var(--burgundy))]/40 hover:shadow-md transition-all relative"
                style={{ backgroundColor: pres.accent }}
              >
                <div className={`absolute inset-0 ${patternStyle[pres.slidePattern]}`} />
                <div className="absolute inset-0 p-3 flex flex-col justify-between">
                  {num === 1 ? (
                    <>
                      <div className="w-4 h-4 rounded-sm bg-white/20" />
                      <div>
                        <div className="h-2 bg-white/80 rounded mb-1.5 w-3/4" />
                        <div className="h-1.5 bg-white/50 rounded w-1/2" />
                      </div>
                    </>
                  ) : num % 3 === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-white/30 text-2xl font-cormorant font-bold">{num}</div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-end h-full gap-1">
                      <div className="h-1.5 bg-white/60 rounded w-full" />
                      <div className="h-1.5 bg-white/40 rounded w-4/5" />
                      <div className="h-1.5 bg-white/40 rounded w-3/5" />
                    </div>
                  )}
                  <div className="absolute bottom-1.5 right-2 text-white/40 text-[9px]">{num}/{pres.slides}</div>
                </div>
              </div>
            ))}
            {pres.slides > 9 && (
              <div className="aspect-video rounded-lg border border-dashed border-border flex items-center justify-center">
                <p className="text-xs text-[hsl(var(--muted-foreground))] text-center">
                  +{pres.slides - 9} слайдов<br />
                  <span className="text-[10px]">при скачивании</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-3 border-t border-border bg-[hsl(var(--beige-dark))] flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
          <span>{pres.slides} слайдов · {pres.size} · {pres.updated}</span>
          <span>{pres.author}</span>
        </div>
      </div>
    </div>
  );
}

const accentColors = [
  "hsl(350,60%,28%)", "hsl(210,45%,38%)", "hsl(36,60%,38%)",
  "hsl(130,40%,35%)", "hsl(280,30%,40%)", "hsl(20,60%,38%)",
];
const slidePatterns: Presentation["slidePattern"][] = ["grid", "lines", "dots", "diagonal"];

export default function Presentations() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeAudience, setActiveAudience] = useState<"all" | "internal" | "external">("all");
  const [preview, setPreview] = useState<Presentation | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [dbPresentations, setDbPresentations] = useState<Presentation[] | null>(null);

  useEffect(() => {
    publicApi.getPresentations().then((data: Array<{id: number; title: string; description: string; category: string; audience: string; slides_count: number; file_size: string; file_url: string; author: string; is_new: boolean; updated_at: string}>) => {
      if (!Array.isArray(data) || data.length === 0) return;
      setDbPresentations(data.map((p, i) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        audience: (p.audience === "external" ? "external" : "internal") as "internal" | "external",
        slides: p.slides_count || 0,
        updated: p.updated_at?.slice(0, 10) || "",
        size: p.file_size || "",
        author: p.author || "",
        desc: p.description || "",
        isNew: p.is_new,
        accent: accentColors[i % accentColors.length],
        slidePattern: slidePatterns[i % slidePatterns.length],
      })));
    }).catch(() => {});
  }, []);

  const activePresentations = dbPresentations ?? presentations;
  const categories = ["Все", ...Array.from(new Set(activePresentations.map((p) => p.category)))];

  const filtered = activePresentations.filter((p) => {
    const matchCat = activeCategory === "Все" || p.category === activeCategory;
    const matchAud = activeAudience === "all" || p.audience === activeAudience;
    return matchCat && matchAud;
  });

  return (
    <Layout title="Презентации" subtitle="Фирменные шаблоны, готовые материалы и гайд по оформлению" icon="Presentation">

      {/* Топ-баннер: скачать шаблон */}
      <div className="bg-[hsl(var(--burgundy))] rounded-xl p-5 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Icon name="Presentation" size={22} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Фирменный шаблон PowerPoint</p>
            <p className="text-white/65 text-xs mt-0.5">
              С логотипом, корпоративными цветами и шрифтами. Версия 5.0 · Обновлён 01.06.2026
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white border border-white/30 hover:border-white/60 px-4 py-2.5 rounded-lg transition-all"
          >
            <Icon name="BookOpen" size={13} />
            Гайд по стилю
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold bg-white text-[hsl(var(--burgundy))] px-5 py-2.5 rounded-lg hover:bg-[hsl(var(--beige))] transition-colors">
            <Icon name="Download" size={15} />
            Скачать шаблон
          </button>
        </div>
      </div>

      {/* Гайд по фирменному стилю */}
      {showGuide && (
        <div className="mb-5 animate-fade-in-up">
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Palette" size={15} className="text-[hsl(var(--burgundy))]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                  Гайд по фирменному оформлению
                </span>
              </div>
              <button onClick={() => setShowGuide(false)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                <Icon name="X" size={15} />
              </button>
            </div>
            <div className="grid grid-cols-4 divide-x divide-border">
              {brandRules.map((rule) => (
                <div key={rule.title} className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[hsl(var(--burgundy-pale))] flex items-center justify-center">
                      <Icon name={rule.icon} size={13} className="text-[hsl(var(--burgundy))]" fallback="Info" />
                    </div>
                    <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{rule.title}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {rule.rules.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-[hsl(var(--muted-foreground))] leading-snug">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[hsl(var(--burgundy))]/40 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Цветовая палитра */}
            <div className="px-6 py-4 border-t border-border bg-[hsl(var(--beige-dark))] flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Палитра:</span>
              {[
                { color: "#6B1E2A", name: "Бордовый · Primary" },
                { color: "#F5EEE6", name: "Бежевый · Background", border: true },
                { color: "#2E1A1A", name: "Тёмный · Text" },
                { color: "#FFFFFF", name: "Белый · On Primary", border: true },
                { color: "#8B3A4A", name: "Бордовый light" },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-md shadow-sm flex-shrink-0 ${c.border ? "border border-border" : ""}`}
                    style={{ backgroundColor: c.color }}
                  />
                  <div>
                    <p className="text-[11px] font-mono text-[hsl(var(--foreground))]">{c.color}</p>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{c.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Фильтры */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                activeCategory === cat
                  ? "bg-[hsl(var(--burgundy))] text-white border-[hsl(var(--burgundy))]"
                  : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--burgundy))]/40 hover:text-[hsl(var(--burgundy))]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-border" />
        {(["all", "internal", "external"] as const).map((aud) => (
          <button
            key={aud}
            onClick={() => setActiveAudience(aud)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              activeAudience === aud
                ? "bg-[hsl(var(--foreground))] text-white border-[hsl(var(--foreground))]"
                : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--foreground))]/30"
            }`}
          >
            <Icon name={aud === "external" ? "ExternalLink" : aud === "internal" ? "Lock" : "LayoutGrid"} size={11} fallback="LayoutGrid" />
            {aud === "all" ? "Все" : aud === "internal" ? "Внутренние" : "Внешние"}
          </button>
        ))}
        <span className="ml-auto text-xs text-[hsl(var(--muted-foreground))]">{filtered.length} презентаций</span>
      </div>

      {/* Галерея */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((pres) => (
          <div
            key={pres.id}
            className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => setPreview(pres)}
          >
            {/* Превью слайда */}
            <div
              className="h-36 relative overflow-hidden flex items-end p-4"
              style={{ backgroundColor: pres.accent }}
            >
              <div className={`absolute inset-0 ${patternStyle[pres.slidePattern]}`} />
              {/* Мок слайда */}
              <div className="absolute top-4 right-4 w-5 h-5 rounded-sm bg-white/20" />
              <div className="absolute top-4 left-4 right-14">
                <div className="h-2.5 bg-white/80 rounded mb-1.5 w-3/4" />
                <div className="h-1.5 bg-white/50 rounded w-1/2" />
              </div>
              <div className="absolute bottom-12 left-4 right-4 space-y-1.5">
                <div className="h-1.5 bg-white/40 rounded w-full" />
                <div className="h-1.5 bg-white/30 rounded w-4/5" />
              </div>
              {/* Оверлей при наведении */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <div className="bg-white rounded-lg px-3 py-2 flex items-center gap-1.5 text-xs font-medium text-[hsl(var(--foreground))] shadow-lg">
                    <Icon name="Eye" size={13} />
                    Просмотр
                  </div>
                </div>
              </div>
              {/* Бейджи */}
              {pres.isNew && (
                <span className="absolute top-2 left-2 text-[10px] font-bold bg-[hsl(36,100%,60%)] text-white px-2 py-0.5 rounded-sm z-10">
                  Новое
                </span>
              )}
              <span className={`absolute bottom-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-sm z-10 ${
                pres.audience === "external"
                  ? "bg-white/20 text-white"
                  : "bg-black/20 text-white/80"
              }`}>
                {pres.audience === "external" ? "Внешняя" : "Внутренняя"}
              </span>
              <div className="absolute bottom-2 left-2 text-white/50 text-[10px] font-cormorant z-10">
                {pres.slides} сл.
              </div>
            </div>

            {/* Карточка */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] leading-snug mb-1.5 group-hover:text-[hsl(var(--burgundy))] transition-colors">
                {pres.title}
              </h3>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2 mb-3">
                {pres.desc}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${catColors[pres.category] || "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"}`}>
                  {pres.category}
                </span>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{pres.author}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                  {pres.updated} · {pres.size}
                </span>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setPreview(pres)}
                    className="flex items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--burgundy))] transition-colors"
                  >
                    <Icon name="Eye" size={12} />
                    Смотреть
                  </button>
                  <button className="flex items-center gap-1 text-[11px] font-medium text-[hsl(var(--burgundy))] hover:underline">
                    <Icon name="Download" size={12} />
                    Скачать
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-border">
          <Icon name="Presentation" size={32} className="mx-auto mb-3 opacity-20 text-[hsl(var(--muted-foreground))]" />
          <p className="text-sm text-[hsl(var(--muted-foreground))]">По выбранным фильтрам ничего не найдено</p>
        </div>
      )}

      {/* Модалка предпросмотра */}
      {preview && <PreviewModal pres={preview} onClose={() => setPreview(null)} />}
    </Layout>
  );
}