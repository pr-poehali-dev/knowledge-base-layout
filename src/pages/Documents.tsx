import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import { publicApi } from "@/lib/publicApi";

type DocType = "PDF" | "DOCX" | "XLSX";

interface Doc {
  id: number;
  title: string;
  type: DocType;
  size: string;
  updated: string;
  version: string;
  desc: string;
  hasTemplate: boolean;
  hot: boolean;
  isTemplate: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  desc: string;
  docs: Doc[];
}

const categories: Category[] = [
  {
    id: "hr",
    label: "Кадровые документы",
    icon: "Users",
    desc: "Заявления, приказы, регламенты по работе с персоналом",
    docs: [
      {
        id: 1, title: "Заявление на ежегодный оплачиваемый отпуск", type: "DOCX", size: "42 КБ",
        updated: "15.05.2026", version: "1.0",
        desc: "Стандартная форма заявления. Подаётся не позднее чем за 2 недели.",
        hasTemplate: true, hot: false, isTemplate: true,
      },
      {
        id: 2, title: "Заявление об увольнении по собственному желанию", type: "DOCX", size: "38 КБ",
        updated: "10.05.2026", version: "1.2",
        desc: "Форма заявления с указанием даты и основания увольнения.",
        hasTemplate: true, hot: false, isTemplate: true,
      },
      {
        id: 3, title: "Служебная записка (шаблон)", type: "DOCX", size: "36 КБ",
        updated: "01.04.2026", version: "2.0",
        desc: "Универсальный шаблон служебной записки на имя руководителя.",
        hasTemplate: true, hot: false, isTemplate: true,
      },
      {
        id: 4, title: "Регламент оформления командировок", type: "PDF", size: "560 КБ",
        updated: "25.05.2026", version: "1.4",
        desc: "Порядок оформления, расходов и авансового отчёта по командировкам.",
        hasTemplate: false, hot: false, isTemplate: false,
      },
      {
        id: 5, title: "Положение о премировании", type: "PDF", size: "380 КБ",
        updated: "01.04.2026", version: "2.3",
        desc: "Критерии и порядок начисления квартальных и годовых премий.",
        hasTemplate: false, hot: false, isTemplate: false,
      },
      {
        id: 6, title: "Положение о защите персональных данных", type: "PDF", size: "820 КБ",
        updated: "20.03.2026", version: "3.1",
        desc: "Требования к хранению и обработке персональных данных сотрудников.",
        hasTemplate: false, hot: false, isTemplate: false,
      },
    ],
  },
  {
    id: "finance",
    label: "Финансовые документы",
    icon: "Calculator",
    desc: "Авансовые отчёты, акты, заявки на оплату",
    docs: [
      {
        id: 7, title: "Авансовый отчёт (форма АО-1)", type: "XLSX", size: "92 КБ",
        updated: "03.06.2026", version: "2.0",
        desc: "Официальная форма отчёта об использовании подотчётных средств.",
        hasTemplate: true, hot: true, isTemplate: true,
      },
      {
        id: 8, title: "Заявка на оплату счёта", type: "DOCX", size: "48 КБ",
        updated: "28.05.2026", version: "1.1",
        desc: "Форма для согласования и оплаты входящих счетов от поставщиков.",
        hasTemplate: true, hot: false, isTemplate: true,
      },
      {
        id: 9, title: "Акт выполненных работ (шаблон)", type: "DOCX", size: "54 КБ",
        updated: "15.04.2026", version: "4.0",
        desc: "Типовая форма акта для подтверждения оказания услуг или выполнения работ.",
        hasTemplate: true, hot: false, isTemplate: true,
      },
      {
        id: 10, title: "Регламент согласования договоров", type: "PDF", size: "710 КБ",
        updated: "10.04.2026", version: "2.2",
        desc: "Пошаговый порядок согласования договоров с юридическим и финансовым отделами.",
        hasTemplate: false, hot: false, isTemplate: false,
      },
    ],
  },
  {
    id: "legal",
    label: "Юридические документы",
    icon: "Scale",
    desc: "Договоры, соглашения, политики",
    docs: [
      {
        id: 11, title: "Типовой договор аренды офиса", type: "DOCX", size: "148 КБ",
        updated: "03.06.2026", version: "3.0",
        desc: "Шаблон договора аренды нежилого помещения. Согласован юридическим отделом.",
        hasTemplate: true, hot: true, isTemplate: true,
      },
      {
        id: 12, title: "Соглашение о неразглашении (NDA)", type: "DOCX", size: "84 КБ",
        updated: "03.06.2026", version: "3.0",
        desc: "Типовой NDA для подписания с партнёрами, подрядчиками и сотрудниками.",
        hasTemplate: true, hot: true, isTemplate: true,
      },
      {
        id: 13, title: "Политика конфиденциальности", type: "PDF", size: "1.2 МБ",
        updated: "02.06.2026", version: "2.1",
        desc: "Правила обработки и защиты персональных данных клиентов и сотрудников.",
        hasTemplate: false, hot: false, isTemplate: false,
      },
      {
        id: 14, title: "Претензионное письмо (шаблон)", type: "DOCX", size: "46 КБ",
        updated: "12.03.2026", version: "1.0",
        desc: "Шаблон официального претензионного письма контрагенту.",
        hasTemplate: true, hot: false, isTemplate: true,
      },
    ],
  },
  {
    id: "safety",
    label: "Безопасность и охрана труда",
    icon: "ShieldCheck",
    desc: "Инструктажи, инструкции, регламенты безопасности",
    docs: [
      {
        id: 15, title: "Инструкция по охране труда (общая)", type: "PDF", size: "2.4 МБ",
        updated: "10.05.2026", version: "4.2",
        desc: "Обязательный документ для ознакомления всеми сотрудниками при трудоустройстве.",
        hasTemplate: false, hot: false, isTemplate: false,
      },
      {
        id: 16, title: "Журнал инструктажа по ОТ", type: "XLSX", size: "68 КБ",
        updated: "01.03.2026", version: "2.0",
        desc: "Форма журнала для фиксации прохождения инструктажей сотрудниками.",
        hasTemplate: true, hot: false, isTemplate: true,
      },
      {
        id: 17, title: "IT-политика компании", type: "PDF", size: "1.1 МБ",
        updated: "20.03.2026", version: "1.8",
        desc: "Правила использования корпоративного оборудования, ПО и сетевых ресурсов.",
        hasTemplate: false, hot: false, isTemplate: false,
      },
    ],
  },
];

const typeConfig: Record<string, { icon: string; color: string; bg: string; label: string }> = {
  PDF:  { icon: "FileText",  color: "text-red-500",    bg: "bg-red-50",   label: "PDF"  },
  DOCX: { icon: "FileType",  color: "text-blue-500",   bg: "bg-blue-50",  label: "DOCX" },
  XLSX: { icon: "Table",     color: "text-green-600",  bg: "bg-green-50", label: "XLSX" },
};

interface SampleModalProps {
  doc: Doc;
  onClose: () => void;
}

function SampleModal({ doc, onClose }: SampleModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[hsl(var(--burgundy))] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">Образец заполнения</p>
            <p className="text-sm font-semibold text-white mt-0.5">{doc.title}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Icon name="X" size={14} className="text-white" />
          </button>
        </div>
        {/* Имитация заполненного документа */}
        <div className="p-6">
          <div className="border border-border rounded-lg p-5 bg-[hsl(var(--beige))] font-golos text-xs space-y-3">
            <div className="text-right text-[11px] text-[hsl(var(--muted-foreground))]">
              Генеральному директору<br />
              ООО «Компания»<br />
              Смирнову А.В.<br />
              от Иванова И.И.,<br />
              менеджера отдела продаж
            </div>
            <p className="text-center font-semibold text-sm pt-2">
              {doc.title.replace("Шаблон ", "").replace("(шаблон)", "").replace("Форма ", "")}
            </p>
            <p className="text-[hsl(var(--foreground))]/80 leading-relaxed">
              Прошу предоставить ежегодный оплачиваемый отпуск продолжительностью 14 (четырнадцать) 
              календарных дней с 16 июня 2026 г. по 29 июня 2026 г.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-border text-[hsl(var(--muted-foreground))]">
              <span>04.06.2026</span>
              <span>Иванов И.И. ____________</span>
            </div>
          </div>
          <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-3 text-center">
            Это демонстрационный образец. Скачайте шаблон для редактирования.
          </p>
          <button
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[hsl(var(--burgundy))] text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Icon name="Download" size={14} />
            Скачать шаблон
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Documents() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sampleDoc, setSampleDoc] = useState<Doc | null>(null);
  const [filterTemplates, setFilterTemplates] = useState(false);
  const [dbDocs, setDbDocs] = useState<typeof categories | null>(null);

  useEffect(() => {
    publicApi.getDocuments().then((data: Array<{id: number; title: string; description: string; category: string; file_type: string; file_size: string; file_url: string; version: string; is_template: boolean; updated_at: string}>) => {
      if (!Array.isArray(data) || data.length === 0) return;
      // Группируем по категориям
      const map = new Map<string, typeof categories[0]>();
      const catMeta: Record<string, { icon: string; desc: string }> = {
        "Кадровые документы":            { icon: "Users",       desc: "Заявления, приказы, регламенты по работе с персоналом" },
        "Финансовые документы":          { icon: "Calculator",  desc: "Авансовые отчёты, акты, заявки на оплату" },
        "Юридические документы":         { icon: "Scale",       desc: "Договоры, соглашения, политики" },
        "Безопасность и охрана труда":   { icon: "ShieldCheck", desc: "Инструктажи, инструкции, регламенты безопасности" },
      };
      data.forEach((d) => {
        const cat = d.category || "Прочее";
        if (!map.has(cat)) {
          const meta = catMeta[cat] || { icon: "Folder", desc: cat };
          map.set(cat, { id: cat.toLowerCase().replace(/\s+/g, "-"), label: cat, icon: meta.icon, desc: meta.desc, docs: [] });
        }
        map.get(cat)!.docs.push({
          id: d.id,
          title: d.title,
          type: (d.file_type as DocType) || "PDF",
          size: d.file_size || "",
          updated: d.updated_at?.slice(0, 10) || "",
          version: d.version || "1.0",
          desc: d.description || "",
          hasTemplate: d.is_template,
          hot: false,
          isTemplate: d.is_template,
        });
      });
      setDbDocs(Array.from(map.values()));
    }).catch(() => {});
  }, []);

  const activeCategories = dbDocs ?? categories;

  const visibleCategories = activeCategory === "all"
    ? activeCategories
    : activeCategories.filter((c) => c.id === activeCategory);

  const filterDoc = (doc: Doc) => {
    const matchSearch = search === "" || doc.title.toLowerCase().includes(search.toLowerCase());
    const matchTemplate = !filterTemplates || doc.isTemplate;
    return matchSearch && matchTemplate;
  };

  const totalDocs = activeCategories.reduce((acc, c) => acc + c.docs.length, 0);

  return (
    <Layout title="Документы" subtitle="Регламенты, шаблоны и официальные формы" icon="FileText">
      {/* Шапка с поиском и фильтрами */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-5 mb-5">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию документа…"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[hsl(var(--beige))] border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--burgundy))]/20 font-golos"
            />
          </div>
          <button
            onClick={() => setFilterTemplates(!filterTemplates)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              filterTemplates
                ? "bg-[hsl(var(--burgundy))] text-white border-[hsl(var(--burgundy))]"
                : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--burgundy))]/40"
            }`}
          >
            <Icon name="FileEdit" size={14} />
            Только шаблоны
          </button>
          <span className="flex items-center text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--beige))] px-3 rounded-lg border border-border whitespace-nowrap">
            {totalDocs} документов
          </span>
        </div>
        {/* Категории */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              activeCategory === "all"
                ? "bg-[hsl(var(--burgundy))] text-white border-[hsl(var(--burgundy))]"
                : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--burgundy))]/40 hover:text-[hsl(var(--burgundy))]"
            }`}
          >
            Все категории
          </button>
          {activeCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                activeCategory === cat.id
                  ? "bg-[hsl(var(--burgundy))] text-white border-[hsl(var(--burgundy))]"
                  : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--burgundy))]/40 hover:text-[hsl(var(--burgundy))]"
              }`}
            >
              <Icon name={cat.icon} size={12} fallback="Folder" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Категории с документами */}
      <div className="space-y-5">
        {visibleCategories.map((cat) => {
          const filteredDocs = cat.docs.filter(filterDoc);
          if (filteredDocs.length === 0) return null;
          return (
            <div key={cat.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              {/* Заголовок категории */}
              <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[hsl(var(--burgundy-pale))] flex items-center justify-center">
                    <Icon name={cat.icon} size={15} className="text-[hsl(var(--burgundy))]" fallback="Folder" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{cat.label}</p>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{cat.desc}</p>
                  </div>
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  {filteredDocs.length} {filteredDocs.length === 1 ? "документ" : "документов"}
                </span>
              </div>

              {/* Список документов */}
              <div className="divide-y divide-border">
                {filteredDocs.map((doc) => {
                  const tc = typeConfig[doc.type] || typeConfig["PDF"];
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-[hsl(var(--beige))] transition-colors group"
                    >
                      {/* Иконка типа */}
                      <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${tc.bg}`}>
                        <Icon name={tc.icon} size={16} className={tc.color} fallback="File" />
                        <span className={`text-[9px] font-bold mt-0.5 ${tc.color}`}>{tc.label}</span>
                      </div>

                      {/* Название и описание */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <p className="text-sm font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--burgundy))] transition-colors">
                            {doc.title}
                          </p>
                          {doc.hot && (
                            <span className="text-[10px] font-bold bg-[hsl(350,60%,28%)] text-white px-1.5 py-0.5 rounded-sm">
                              Обновлено
                            </span>
                          )}
                          {doc.isTemplate && (
                            <span className="text-[10px] font-medium bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)] px-1.5 py-0.5 rounded-sm">
                              Шаблон
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[hsl(var(--muted-foreground))] leading-snug line-clamp-1">
                          {doc.desc}
                        </p>
                      </div>

                      {/* Мета и кнопки */}
                      <div className="flex items-center gap-5 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                            Версия {doc.version}
                          </p>
                          <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                            Обновлён {doc.updated}
                          </p>
                        </div>
                        <p className="text-[11px] text-[hsl(var(--muted-foreground))] w-14 text-right">
                          {doc.size}
                        </p>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {doc.hasTemplate && (
                            <button
                              onClick={() => setSampleDoc(doc)}
                              className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors border border-border rounded-md px-2.5 py-1.5 bg-white"
                            >
                              <Icon name="Eye" size={12} />
                              Образец
                            </button>
                          )}
                          <button className="flex items-center gap-1.5 text-xs font-medium bg-[hsl(var(--burgundy))] text-white rounded-md px-3 py-1.5 hover:opacity-90 transition-opacity">
                            <Icon name="Download" size={12} />
                            Скачать
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Пусто */}
      {visibleCategories.every((c) => c.docs.filter(filterDoc).length === 0) && (
        <div className="text-center py-16 bg-white rounded-xl border border-border">
          <Icon name="FolderOpen" size={32} className="mx-auto mb-3 opacity-30 text-[hsl(var(--muted-foreground))]" />
          <p className="text-sm text-[hsl(var(--muted-foreground))]">По вашему запросу ничего не найдено</p>
        </div>
      )}

      {/* Модалка образца */}
      {sampleDoc && <SampleModal doc={sampleDoc} onClose={() => setSampleDoc(null)} />}
    </Layout>
  );
}