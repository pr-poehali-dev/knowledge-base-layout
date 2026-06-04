import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const offices = ["Все офисы", "Москва, Арбат", "Москва, Сити", "Санкт-Петербург", "Екатеринбург"];

const employees = [
  { id: 1, name: "Алексей Смирнов", role: "Генеральный директор", dept: "Руководство", office: "Москва, Арбат", room: "501", phone: "доб. 001", email: "a.smirnov@company.ru", initials: "АС" },
  { id: 2, name: "Марина Козлова", role: "Руководитель отдела продаж", dept: "Продажи", office: "Москва, Арбат", room: "312", phone: "доб. 300", email: "m.kozlova@company.ru", initials: "МК" },
  { id: 3, name: "Наталья Петрова", role: "HR-директор", dept: "HR", office: "Москва, Арбат", room: "210", phone: "доб. 201", email: "n.petrova@company.ru", initials: "НП" },
  { id: 4, name: "Дмитрий Волков", role: "IT-директор", dept: "IT", office: "Москва, Сити", room: "4А", phone: "доб. 100", email: "d.volkov@company.ru", initials: "ДВ" },
  { id: 5, name: "Елена Новикова", role: "Главный бухгалтер", dept: "Бухгалтерия", office: "Москва, Арбат", room: "305", phone: "доб. 305", email: "e.novikova@company.ru", initials: "ЕН" },
  { id: 6, name: "Сергей Фёдоров", role: "Директор по маркетингу", dept: "Маркетинг", office: "Москва, Сити", room: "8B", phone: "доб. 320", email: "s.fedorov@company.ru", initials: "СФ" },
  { id: 7, name: "Ольга Захарова", role: "Руководитель юротдела", dept: "Юридический", office: "Москва, Арбат", room: "415", phone: "доб. 410", email: "o.zaharova@company.ru", initials: "ОЗ" },
  { id: 8, name: "Алина Громова", role: "Старший секретарь", dept: "Секретариат", office: "Москва, Арбат", room: "101", phone: "доб. 102", email: "a.gromova@company.ru", initials: "АГ" },
  { id: 9, name: "Иван Черников", role: "Менеджер по продажам", dept: "Продажи", office: "Санкт-Петербург", room: "22", phone: "доб. 401", email: "i.chernikov@company.ru", initials: "ИЧ" },
  { id: 10, name: "Татьяна Белова", role: "Специалист по обучению", dept: "HR", office: "Москва, Арбат", room: "215", phone: "доб. 215", email: "t.belova@company.ru", initials: "ТБ" },
  { id: 11, name: "Антон Кузнецов", role: "Системный администратор", dept: "IT", office: "Москва, Сити", room: "4B", phone: "доб. 105", email: "a.kuznetsov@company.ru", initials: "АК" },
  { id: 12, name: "Виктор Сидоров", role: "Начальник АХО", dept: "АХО", office: "Екатеринбург", room: "102", phone: "доб. 001", email: "v.sidorov@company.ru", initials: "ВС" },
];

const depts = ["Все отделы", ...Array.from(new Set(employees.map((e) => e.dept)))];

const deptColors: Record<string, string> = {
  Руководство: "bg-[hsl(350,30%,90%)] text-[hsl(350,50%,30%)]",
  Продажи: "bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)]",
  HR: "bg-[hsl(36,40%,88%)] text-[hsl(36,50%,30%)]",
  IT: "bg-[hsl(280,20%,90%)] text-[hsl(280,30%,30%)]",
  Бухгалтерия: "bg-[hsl(130,20%,88%)] text-[hsl(130,30%,28%)]",
  Маркетинг: "bg-[hsl(20,40%,88%)] text-[hsl(20,50%,30%)]",
  Юридический: "bg-[hsl(180,25%,88%)] text-[hsl(180,35%,28%)]",
  Секретариат: "bg-[hsl(45,40%,88%)] text-[hsl(45,50%,28%)]",
  АХО: "bg-[hsl(0,0%,88%)] text-[hsl(0,0%,35%)]",
};

const avatarColors = [
  "hsl(350,60%,28%)", "hsl(210,45%,40%)", "hsl(36,60%,40%)", "hsl(130,40%,35%)",
  "hsl(280,30%,40%)", "hsl(20,60%,40%)", "hsl(180,35%,35%)", "hsl(45,60%,38%)",
];

export default function Reference() {
  const [search, setSearch] = useState("");
  const [activeDept, setActiveDept] = useState("Все отделы");
  const [activeOffice, setActiveOffice] = useState("Все офисы");
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employees[0] | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase())
      || e.role.toLowerCase().includes(search.toLowerCase())
      || e.dept.toLowerCase().includes(search.toLowerCase());
    const matchDept = activeDept === "Все отделы" || e.dept === activeDept;
    const matchOffice = activeOffice === "Все офисы" || e.office === activeOffice;
    return matchSearch && matchDept && matchOffice;
  });

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Layout title="Справочник" subtitle="Каталог сотрудников компании" icon="BookMarked">
      {/* Поиск и фильтры */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-5 mb-5">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по ФИО, должности или отделу…"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[hsl(var(--beige))] border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--burgundy))]/20 font-golos"
            />
          </div>
          <span className="flex items-center text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--beige))] px-3 rounded-lg border border-border">
            {filtered.length} из {employees.length}
          </span>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {depts.map((d) => (
              <button key={d} onClick={() => setActiveDept(d)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${activeDept === d ? "bg-[hsl(var(--burgundy))] text-white border-[hsl(var(--burgundy))]" : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--burgundy))]/40"}`}>
                {d}
              </button>
            ))}
          </div>
          <div className="w-px bg-border" />
          <div className="flex gap-1.5 flex-wrap">
            {offices.map((o) => (
              <button key={o} onClick={() => setActiveOffice(o)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${activeOffice === o ? "bg-[hsl(var(--foreground))] text-white border-[hsl(var(--foreground))]" : "bg-white text-[hsl(var(--muted-foreground))] border-border hover:border-[hsl(var(--foreground))]/30"}`}>
                {o}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Сетка профилей */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[hsl(var(--muted-foreground))] bg-white rounded-xl border border-border">
              <Icon name="UserX" size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Сотрудники не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {filtered.map((emp, i) => (
                <div
                  key={emp.id}
                  onClick={() => setSelectedEmployee(selectedEmployee?.id === emp.id ? null : emp)}
                  className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedEmployee?.id === emp.id
                      ? "border-[hsl(var(--burgundy))] shadow-md"
                      : "border-border hover:border-[hsl(var(--burgundy))]/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
                    >
                      {emp.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[hsl(var(--foreground))] leading-snug truncate">{emp.name}</p>
                      <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug truncate">{emp.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${deptColors[emp.dept] || ""}`}>
                      {emp.dept}
                    </span>
                    <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{emp.office.split(",")[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Карточка сотрудника */}
        {selectedEmployee && (
          <div className="w-60 flex-shrink-0">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden sticky top-6">
              {/* Шапка карточки */}
              <div className="bg-[hsl(var(--burgundy))] p-5 text-center">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Icon name="X" size={12} className="text-white" />
                </button>
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 text-white text-lg font-bold">
                    {selectedEmployee.initials}
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">{selectedEmployee.name}</p>
                <p className="text-xs text-white/70 mt-0.5 leading-snug">{selectedEmployee.role}</p>
                <span className={`inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-sm bg-white/20 text-white`}>
                  {selectedEmployee.dept}
                </span>
              </div>
              {/* Данные */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={13} className="text-[hsl(var(--muted-foreground))]" />
                    <div>
                      <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Офис / кабинет</p>
                      <p className="text-xs font-medium text-[hsl(var(--foreground))]">{selectedEmployee.office}, {selectedEmployee.room}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={13} className="text-[hsl(var(--muted-foreground))]" />
                    <div>
                      <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Телефон</p>
                      <p className="text-xs font-medium text-[hsl(var(--foreground))]">{selectedEmployee.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedEmployee.phone, "phone")}
                    className="text-[10px] text-[hsl(var(--burgundy))] opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                  >
                    {copied === "phone" ? "✓" : "Копировать"}
                  </button>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={13} className="text-[hsl(var(--muted-foreground))]" />
                    <div>
                      <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Email</p>
                      <p className="text-xs font-medium text-[hsl(var(--burgundy))] truncate max-w-[120px]">{selectedEmployee.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedEmployee.email, "email")}
                    className="text-[10px] text-[hsl(var(--burgundy))] opacity-0 group-hover:opacity-100 transition-opacity hover:underline flex-shrink-0"
                  >
                    {copied === "email" ? "✓" : "Копировать"}
                  </button>
                </div>
                <div className="pt-2 border-t border-border flex gap-2">
                  <a
                    href={`mailto:${selectedEmployee.email}`}
                    className="flex-1 text-center text-xs font-medium bg-[hsl(var(--burgundy))] text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Написать
                  </a>
                  <button
                    onClick={() => copyToClipboard(selectedEmployee.email, "all")}
                    className="flex-1 text-center text-xs font-medium border border-border text-[hsl(var(--foreground))] py-2 rounded-lg hover:bg-[hsl(var(--beige))] transition-colors"
                  >
                    {copied === "all" ? "Скопировано ✓" : "Копировать"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
