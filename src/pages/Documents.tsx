import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const docs = [
  {
    id: 1, title: "Политика конфиденциальности", type: "PDF", size: "1.2 МБ",
    category: "Юридические", updated: "03.06.2026", version: "2.1", hot: true,
    desc: "Правила обработки персональных данных сотрудников и клиентов компании.",
  },
  {
    id: 2, title: "Шаблон NDA для партнёров", type: "DOCX", size: "84 КБ",
    category: "Юридические", updated: "03.06.2026", version: "3.0", hot: true,
    desc: "Типовой договор о неразглашении для подписания с внешними партнёрами.",
  },
  {
    id: 3, title: "Регламент командировок", type: "PDF", size: "560 КБ",
    category: "HR", updated: "25.05.2026", version: "1.4", hot: false,
    desc: "Порядок оформления, расходов и отчётности по служебным командировкам.",
  },
  {
    id: 4, title: "Форма заявления на отпуск", type: "DOCX", size: "42 КБ",
    category: "HR", updated: "15.05.2026", version: "1.0", hot: false,
    desc: "Стандартная форма для подачи заявления на ежегодный оплачиваемый отпуск.",
  },
  {
    id: 5, title: "Инструкция по охране труда", type: "PDF", size: "2.4 МБ",
    category: "Безопасность", updated: "10.05.2026", version: "4.2", hot: false,
    desc: "Обязательный документ для всех сотрудников. Правила безопасной работы на рабочем месте.",
  },
  {
    id: 6, title: "Положение о премировании", type: "PDF", size: "380 КБ",
    category: "HR", updated: "01.04.2026", version: "2.3", hot: false,
    desc: "Критерии и порядок начисления премий по итогам отчётных периодов.",
  },
  {
    id: 7, title: "IT-политика компании", type: "PDF", size: "1.1 МБ",
    category: "IT", updated: "20.03.2026", version: "1.8", hot: false,
    desc: "Правила использования корпоративного оборудования, ПО и сетевых ресурсов.",
  },
  {
    id: 8, title: "Шаблон коммерческого предложения", type: "PPTX", size: "3.6 МБ",
    category: "Продажи", updated: "10.03.2026", version: "5.0", hot: false,
    desc: "Брендированный шаблон для подготовки коммерческих предложений клиентам.",
  },
];

const categories = ["Все", "Юридические", "HR", "IT", "Безопасность", "Продажи"];

const typeIcon: Record<string, string> = {
  PDF: "FileText",
  DOCX: "FileType",
  PPTX: "Presentation",
};

const typeColor: Record<string, string> = {
  PDF: "text-red-500",
  DOCX: "text-blue-500",
  PPTX: "text-orange-500",
};

export default function Documents() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все" ? docs : docs.filter((d) => d.category === activeCategory);

  return (
    <Layout title="Документы" subtitle="Шаблоны, регламенты и официальные формы" icon="FileText">
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

      {/* Список документов */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-[hsl(var(--beige))] transition-colors cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-[hsl(var(--beige-dark))] flex items-center justify-center flex-shrink-0">
                <Icon
                  name={typeIcon[doc.type] || "File"}
                  size={18}
                  className={typeColor[doc.type] || "text-[hsl(var(--muted-foreground))]"}
                  fallback="File"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--burgundy))] transition-colors">
                    {doc.title}
                  </p>
                  {doc.hot && (
                    <span className="text-[10px] font-semibold bg-[hsl(350,60%,28%)] text-white px-1.5 py-0.5 rounded-sm">
                      Новое
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))] line-clamp-1">{doc.desc}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{doc.category}</p>
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))]">v{doc.version} · {doc.updated}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{doc.type}</p>
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{doc.size}</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-[hsl(var(--burgundy))] font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="Download" size={13} />
                  Скачать
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">
          <Icon name="FolderOpen" size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">В этой категории пока нет документов</p>
        </div>
      )}
    </Layout>
  );
}
