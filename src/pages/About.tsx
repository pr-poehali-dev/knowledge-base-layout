import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const departments = [
  { name: "Генеральный директор", head: "Алексей Смирнов", icon: "Crown", people: 1 },
  { name: "Отдел продаж", head: "Марина Козлова", icon: "TrendingUp", people: 24 },
  { name: "HR-отдел", head: "Наталья Петрова", icon: "Users", people: 8 },
  { name: "IT-департамент", head: "Дмитрий Волков", icon: "Monitor", people: 15 },
  { name: "Бухгалтерия", head: "Елена Новикова", icon: "Calculator", people: 6 },
  { name: "Отдел маркетинга", head: "Сергей Фёдоров", icon: "Megaphone", people: 11 },
  { name: "Юридический отдел", head: "Ольга Захарова", icon: "Scale", people: 4 },
];

const milestones = [
  { year: "2009", text: "Основание компании. Первый офис, 12 сотрудников." },
  { year: "2013", text: "Открытие филиала в Санкт-Петербурге. Расширение команды до 80 человек." },
  { year: "2017", text: "Запуск собственной IT-платформы. Выход на международный рынок." },
  { year: "2021", text: "Реструктуризация. Переход на гибридный формат работы." },
  { year: "2024", text: "Открытие нового направления. Команда — более 300 специалистов." },
];

const values = [
  { icon: "Star", label: "Качество", desc: "Мы не идём на компромисс с результатом" },
  { icon: "HandshakeIcon", label: "Доверие", desc: "Открытость внутри команды и с клиентами" },
  { icon: "Zap", label: "Скорость", desc: "Принимаем решения быстро, без бюрократии" },
  { icon: "Heart", label: "Забота", desc: "О сотрудниках, клиентах и обществе" },
];

export default function About() {
  return (
    <Layout title="О компании" subtitle="История, структура и ценности" icon="Building2">
      {/* Миссия */}
      <div className="bg-[hsl(var(--burgundy))] rounded-xl p-6 mb-5 text-white">
        <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-2">Миссия компании</p>
        <p className="font-cormorant text-2xl font-medium leading-snug">
          «Создавать решения, которые меняют жизнь людей к лучшему — через технологии, профессионализм и заботу.»
        </p>
      </div>

      {/* Ценности */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {values.map((v) => (
          <div key={v.label} className="bg-white rounded-xl border border-border p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-full bg-[hsl(var(--burgundy-pale))] flex items-center justify-center mx-auto mb-2">
              <Icon name={v.icon} size={16} className="text-[hsl(var(--burgundy))]" fallback="Star" />
            </div>
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{v.label}</p>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5 leading-snug">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Структура */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden mb-5">
        <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Организационная структура
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Актуально на 04.06.2026</span>
        </div>
        <div className="divide-y divide-border">
          {departments.map((dep) => (
            <div key={dep.name} className="flex items-center gap-4 px-6 py-4 hover:bg-[hsl(var(--beige))] transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-[hsl(var(--burgundy-pale))] flex items-center justify-center flex-shrink-0">
                <Icon name={dep.icon} size={16} className="text-[hsl(var(--burgundy))]" fallback="Users" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{dep.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Руководитель: {dep.head}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold font-cormorant text-[hsl(var(--burgundy))]">{dep.people}</p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))]">чел.</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-[hsl(var(--muted-foreground))]" />
            </div>
          ))}
        </div>
      </div>

      {/* История */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))]">
          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            История компании
          </span>
        </div>
        <div className="p-6">
          <div className="relative pl-8">
            <div className="absolute left-2.5 top-0 bottom-0 w-px bg-[hsl(var(--border))]" />
            {milestones.map((m, i) => (
              <div key={m.year} className="relative mb-6 last:mb-0">
                <div className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-[hsl(var(--burgundy))] border-2 border-[hsl(var(--beige))] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <div className="font-cormorant text-lg font-semibold text-[hsl(var(--burgundy))] leading-none mb-0.5">
                  {m.year}
                </div>
                <p className="text-sm text-[hsl(var(--foreground))/80] leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
