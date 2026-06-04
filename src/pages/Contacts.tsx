import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const departments = [
  {
    id: 1, icon: "Users", name: "Отдел по работе с персоналом (HR)",
    color: "hsl(36,60%,40%)",
    functions: ["Трудоустройство и оформление", "Отпуска и больничные", "ДМС и льготы", "Адаптация новых сотрудников", "Обучение и развитие"],
    contact: "Наталья Петрова", phone: "доб. 201", email: "hr@company.ru",
  },
  {
    id: 2, icon: "Monitor", name: "IT-служба",
    color: "hsl(210,45%,40%)",
    functions: ["Проблемы с ПК и оргтехникой", "Доступ к системам и ПО", "Корпоративная почта", "VPN и удалённый доступ", "Техническая поддержка"],
    contact: "Дмитрий Волков", phone: "доб. 100", email: "it-help@company.ru",
  },
  {
    id: 3, icon: "Scale", name: "Юридический отдел",
    color: "hsl(180,35%,35%)",
    functions: ["Согласование договоров", "Юридические консультации", "НДА и соглашения", "Претензии и споры"],
    contact: "Ольга Захарова", phone: "доб. 410", email: "legal@company.ru",
  },
  {
    id: 4, icon: "Inbox", name: "Секретариат и делопроизводство",
    color: "hsl(280,30%,40%)",
    functions: ["Пропуска и доступ в офис", "Канцелярия и расходные материалы", "Документооборот", "Курьерская доставка", "Входящая/исходящая корреспонденция"],
    contact: "Алина Громова", phone: "доб. 001", email: "info@company.ru",
  },
  {
    id: 5, icon: "Calculator", name: "Бухгалтерия",
    color: "hsl(150,40%,35%)",
    functions: ["Авансовые отчёты", "Расчёт зарплаты", "Командировочные расходы", "Налоговые вопросы"],
    contact: "Елена Новикова", phone: "доб. 305", email: "buh@company.ru",
  },
  {
    id: 6, icon: "Megaphone", name: "Отдел маркетинга",
    color: "hsl(20,60%,40%)",
    functions: ["Реклама и PR", "Корпоративный брендинг", "SMM и медиа", "Полиграфия и мерч"],
    contact: "Сергей Фёдоров", phone: "доб. 320", email: "marketing@company.ru",
  },
];

const algorithms = [
  { if: "Нужно заказать канцтовары или бумагу", then: "Секретариат", icon: "Inbox" },
  { if: "Не работает компьютер, почта или доступ", then: "IT-служба", icon: "Monitor" },
  { if: "Вопрос по зарплате, отпуску или ДМС", then: "HR-отдел", icon: "Users" },
  { if: "Нужно согласовать договор или НДА", then: "Юридический отдел", icon: "Scale" },
  { if: "Нужен авансовый отчёт или справка о доходах", then: "Бухгалтерия", icon: "Calculator" },
  { if: "Нужен пропуск или бейдж", then: "Секретариат", icon: "Inbox" },
  { if: "Вопрос по рекламным материалам", then: "Маркетинг", icon: "Megaphone" },
  { if: "Новый сотрудник — нужно настроить рабочее место", then: "IT + HR", icon: "UserPlus" },
];

export default function Contacts() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const activeDept = selected !== null ? departments[selected] : hovered !== null ? departments[hovered] : null;

  return (
    <Layout title="К кому обращаться, если…" subtitle="Диспетчерская: найдите нужный отдел за секунду" icon="HelpCircle">

      {/* Интерактивная схема отделов */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden mb-5">
        <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center gap-2">
          <Icon name="Network" size={15} className="text-[hsl(var(--burgundy))]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Схема отделов — наведите для подробностей
          </span>
        </div>
        <div className="p-6 flex gap-6">
          {/* Карточки-схема */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            {departments.map((dept, i) => (
              <div
                key={dept.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(selected === i ? null : i)}
                className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  selected === i
                    ? "border-[hsl(var(--burgundy))] bg-[hsl(var(--burgundy-pale))]"
                    : hovered === i
                    ? "border-[hsl(var(--burgundy))]/40 bg-[hsl(var(--beige))]"
                    : "border-border bg-white hover:border-[hsl(var(--burgundy))]/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: dept.color + "20" }}>
                    <Icon name={dept.icon} size={15} className="text-[hsl(var(--burgundy))]" fallback="Users" />
                  </div>
                  <p className="text-xs font-semibold text-[hsl(var(--foreground))] leading-snug">{dept.name}</p>
                </div>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{dept.contact}</p>
                <div className={`mt-2 text-[10px] font-medium transition-colors ${selected === i ? "text-[hsl(var(--burgundy))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                  {dept.phone} · {dept.email}
                </div>
              </div>
            ))}
          </div>

          {/* Детальная карточка */}
          <div className="w-52 flex-shrink-0">
            {activeDept ? (
              <div className="bg-[hsl(var(--burgundy))] rounded-xl p-5 text-white h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name={activeDept.icon} size={16} className="text-white/80" fallback="Users" />
                  <p className="text-xs font-semibold leading-snug">{activeDept.name}</p>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-2">Функции:</p>
                <ul className="space-y-1.5 mb-4">
                  {activeDept.functions.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[11px] text-white/85">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/20 pt-3 space-y-1.5">
                  <a href={`mailto:${activeDept.email}`} className="flex items-center gap-1.5 text-[11px] text-white/80 hover:text-white transition-colors">
                    <Icon name="Mail" size={11} />
                    {activeDept.email}
                  </a>
                  <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                    <Icon name="Phone" size={11} />
                    {activeDept.phone}
                  </p>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-xl p-5 h-full flex flex-col items-center justify-center text-center">
                <Icon name="MousePointer" size={24} className="text-[hsl(var(--muted-foreground))]/30 mb-2" />
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Наведите или нажмите на отдел</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Алгоритм «Если…, то…» */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden mb-5">
        <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center gap-2">
          <Icon name="ArrowRight" size={15} className="text-[hsl(var(--burgundy))]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Алгоритм: если… то…
          </span>
        </div>
        <div className="divide-y divide-border">
          {algorithms.map((item, i) => (
            <div key={i} className="flex items-center gap-0 hover:bg-[hsl(var(--beige))] transition-colors">
              <div className="flex-1 px-6 py-3.5 flex items-start gap-3">
                <Icon name="HelpCircle" size={14} className="text-[hsl(var(--muted-foreground))] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[hsl(var(--foreground))]/80">Если <span className="font-medium text-[hsl(var(--foreground))]">{item.if}</span></p>
              </div>
              <div className="px-4 text-[hsl(var(--muted-foreground))]">
                <Icon name="ArrowRight" size={16} />
              </div>
              <div className="w-52 px-6 py-3.5 flex items-center gap-2">
                <Icon name={item.icon} size={14} className="text-[hsl(var(--burgundy))] flex-shrink-0" fallback="Users" />
                <p className="text-sm font-semibold text-[hsl(var(--burgundy))]">{item.then}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Таблица контактов */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center gap-2">
          <Icon name="Table" size={15} className="text-[hsl(var(--burgundy))]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Полный список контактов
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Отдел</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Ответственный</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Почта</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Телефон</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-[hsl(var(--beige))] transition-colors">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <Icon name={dept.icon} size={13} className="text-[hsl(var(--burgundy))]" fallback="Users" />
                    <span className="text-xs font-medium text-[hsl(var(--foreground))]">{dept.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-[hsl(var(--muted-foreground))]">{dept.contact}</td>
                <td className="px-4 py-3.5">
                  <a href={`mailto:${dept.email}`} className="text-xs text-[hsl(var(--burgundy))] hover:underline">{dept.email}</a>
                </td>
                <td className="px-4 py-3.5 text-xs text-[hsl(var(--muted-foreground))]">{dept.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
