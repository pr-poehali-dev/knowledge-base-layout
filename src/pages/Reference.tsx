import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const entries = [
  { letter: "А", term: "Аванс", def: "Денежные средства, выданные сотруднику до выполнения работы или поездки.", tag: "Финансы" },
  { letter: "А", term: "Авансовый отчёт", def: "Документ, подтверждающий расходование подотчётных средств.", tag: "Финансы" },
  { letter: "Б", term: "Бизнес-процесс", def: "Цепочка действий, направленных на достижение конкретного результата.", tag: "Процессы" },
  { letter: "В", term: "ВЗ (База знаний)", def: "Корпоративный портал с документами, инструкциями и контактами.", tag: "IT" },
  { letter: "Д", term: "Дедлайн", def: "Крайний срок выполнения задачи или проекта.", tag: "Процессы" },
  { letter: "К", term: "KPI", def: "Ключевые показатели эффективности — метрики для оценки работы сотрудника.", tag: "HR" },
  { letter: "К", term: "Командировка", def: "Поездка сотрудника для выполнения служебного задания за пределами основного места работы.", tag: "HR" },
  { letter: "Н", term: "НДА (NDA)", def: "Соглашение о неразглашении конфиденциальной информации.", tag: "Юридический" },
  { letter: "О", term: "Онбординг", def: "Процесс адаптации нового сотрудника в компании.", tag: "HR" },
  { letter: "Р", term: "Регламент", def: "Документ, устанавливающий порядок выполнения бизнес-процессов.", tag: "Процессы" },
  { letter: "С", term: "Стейкхолдер", def: "Заинтересованная сторона — лицо, влияющее на проект или испытывающее его влияние.", tag: "Процессы" },
  { letter: "Т", term: "ТЗ (Техническое задание)", def: "Документ с требованиями к разработке продукта или услуги.", tag: "IT" },
];

const tags = ["Все", "Финансы", "HR", "IT", "Юридический", "Процессы"];

export default function Reference() {
  const [activeTag, setActiveTag] = useState("Все");

  const filtered = activeTag === "Все" ? entries : entries.filter((e) => e.tag === activeTag);
  const letters = [...new Set(filtered.map((e) => e.letter))].sort();

  const tagColors: Record<string, string> = {
    Финансы: "bg-[hsl(130,20%,88%)] text-[hsl(130,30%,28%)]",
    HR: "bg-[hsl(36,40%,88%)] text-[hsl(36,50%,30%)]",
    IT: "bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)]",
    Юридический: "bg-[hsl(350,30%,90%)] text-[hsl(350,50%,30%)]",
    Процессы: "bg-[hsl(280,20%,90%)] text-[hsl(280,30%,30%)]",
  };

  return (
    <Layout title="Справочник" subtitle="Термины, аббревиатуры и определения" icon="BookMarked">
      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              activeTag === tag
                ? "bg-[hsl(var(--burgundy))] text-white border-[hsl(var(--burgundy))]"
                : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--burgundy))] hover:text-[hsl(var(--burgundy))]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Термины по буквам */}
      <div className="space-y-4">
        {letters.map((letter) => (
          <div key={letter} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-3 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center gap-3">
              <span className="font-cormorant text-2xl font-semibold text-[hsl(var(--burgundy))]">{letter}</span>
            </div>
            <div className="divide-y divide-border">
              {filtered
                .filter((e) => e.letter === letter)
                .map((entry) => (
                  <div key={entry.term} className="px-6 py-4 flex items-start gap-4 hover:bg-[hsl(var(--beige))] transition-colors cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{entry.term}</p>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${tagColors[entry.tag] || ""}`}>
                          {entry.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{entry.def}</p>
                    </div>
                    <Icon name="ChevronRight" size={15} className="text-[hsl(var(--muted-foreground))] mt-1 flex-shrink-0" />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">
          <Icon name="Search" size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">По выбранному фильтру ничего не найдено</p>
        </div>
      )}
    </Layout>
  );
}
