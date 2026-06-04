import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import { publicApi } from "@/lib/publicApi";

interface Employee {
  id: number;
  name: string;
  role: string;
  dept: string;
  location: string;
  room: string;
  phone: string;
  email: string;
  initials: string;
}

// Офис + 40 объектов
const locationGroups: { id: string; label: string; icon: string; employees: Employee[] }[] = [
  {
    id: "office",
    label: "Офис",
    icon: "Building2",
    employees: [
      { id: 1,  name: "Алексей Смирнов",   role: "Генеральный директор",        dept: "Руководство",  location: "Офис",      room: "501",  phone: "доб. 001", email: "a.smirnov@company.ru",   initials: "АС" },
      { id: 2,  name: "Марина Козлова",    role: "Руководитель отдела продаж",  dept: "Продажи",      location: "Офис",      room: "312",  phone: "доб. 300", email: "m.kozlova@company.ru",   initials: "МК" },
      { id: 3,  name: "Наталья Петрова",   role: "HR-директор",                 dept: "HR",           location: "Офис",      room: "210",  phone: "доб. 201", email: "n.petrova@company.ru",   initials: "НП" },
      { id: 4,  name: "Дмитрий Волков",    role: "IT-директор",                 dept: "IT",           location: "Офис",      room: "4А",   phone: "доб. 100", email: "d.volkov@company.ru",    initials: "ДВ" },
      { id: 5,  name: "Елена Новикова",    role: "Главный бухгалтер",           dept: "Бухгалтерия",  location: "Офис",      room: "305",  phone: "доб. 305", email: "e.novikova@company.ru",  initials: "ЕН" },
      { id: 6,  name: "Сергей Фёдоров",    role: "Директор по маркетингу",      dept: "Маркетинг",    location: "Офис",      room: "8B",   phone: "доб. 320", email: "s.fedorov@company.ru",   initials: "СФ" },
      { id: 7,  name: "Ольга Захарова",    role: "Руководитель юротдела",       dept: "Юридический",  location: "Офис",      room: "415",  phone: "доб. 410", email: "o.zaharova@company.ru",  initials: "ОЗ" },
      { id: 8,  name: "Алина Громова",     role: "Старший секретарь",           dept: "Секретариат",  location: "Офис",      room: "101",  phone: "доб. 102", email: "a.gromova@company.ru",   initials: "АГ" },
      { id: 9,  name: "Татьяна Белова",    role: "Специалист по обучению",      dept: "HR",           location: "Офис",      room: "215",  phone: "доб. 215", email: "t.belova@company.ru",    initials: "ТБ" },
      { id: 10, name: "Антон Кузнецов",    role: "Системный администратор",     dept: "IT",           location: "Офис",      room: "4B",   phone: "доб. 105", email: "a.kuznetsov@company.ru", initials: "АК" },
    ],
  },
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `obj${i + 1}`,
    label: `Объект ${i + 1}`,
    icon: "MapPin",
    employees: [
      {
        id: 100 + i * 3,
        name: ["Иван Черников", "Светлана Орлова", "Павел Громов", "Анна Лебедева", "Роман Тихонов",
               "Екатерина Власова", "Михаил Зайцев", "Юлия Морозова", "Андрей Никитин", "Валерия Соколова",
               "Илья Фролов", "Ксения Медведева", "Олег Богданов", "Наталья Козырева", "Артём Шестаков",
               "Вера Панова", "Денис Ларин", "Марина Климова", "Вадим Осипов", "Дарья Кравцова",
               "Станислав Мельников", "Ирина Голубева", "Константин Рябов", "Оксана Федотова", "Алексей Дроздов",
               "Елена Субботина", "Геннадий Крылов", "Надежда Гаврилова", "Борис Тарасов", "Людмила Захарченко",
               "Евгений Беляев", "Ольга Макарова", "Сергей Ковалёв", "Анастасия Куликова", "Николай Воронов",
               "Полина Миронова", "Григорий Карпов", "Татьяна Ершова", "Виктор Ильин", "Зинаида Прокофьева"][i],
        role: ["Управляющий объектом", "Старший менеджер", "Менеджер по аренде", "Администратор объекта",
               "Технический директор", "Менеджер объекта", "Старший администратор", "Координатор объекта",
               "Заместитель управляющего", "Менеджер по эксплуатации"][i % 10],
        dept: ["Управление объектами", "Продажи", "Аренда", "Администрация", "Эксплуатация"][i % 5],
        location: `Объект ${i + 1}`,
        room: `${Math.floor(Math.random() * 5) + 1}0${(i % 9) + 1}`,
        phone: `доб. ${(i + 1) * 10 + 500}`,
        email: `obj${i + 1}@company.ru`,
        initials: ["ИЧ","СО","ПГ","АЛ","РТ","ЕВ","МЗ","ЮМ","АН","ВС",
                   "ИФ","КМ","ОБ","НК","АШ","ВП","ДЛ","МК","ВО","ДК",
                   "СМ","ИГ","КР","ОФ","АД","ЕС","ГК","НГ","БТ","ЛЗ",
                   "ЕБ","ОМ","СК","АК","НВ","ПМ","ГК","ТЕ","ВИ","ЗП"][i],
      },
      {
        id: 100 + i * 3 + 1,
        name: ["Пётр Суворов","Галина Лысенко","Руслан Попов","Диана Семёнова","Максим Чернов",
               "Юлия Щербакова","Тимур Хомяков","Ирина Дегтярёва","Леонид Жуков","Кристина Быкова",
               "Степан Новосёлов","Алсу Мухаметова","Владимир Прохоров","Марьяна Гущина","Артур Романов",
               "Нина Белкина","Кирилл Трофимов","Светлана Абрамова","Александр Путилин","Яна Воробьёва",
               "Захар Семёнов","Лилия Кириллова","Тимофей Архипов","Виктория Панина","Глеб Харитонов",
               "Карина Ефимова","Фёдор Малинин","Нелли Цветкова","Виталий Булгаков","Алина Разумова",
               "Игорь Корнеев","Оксана Лазарева","Тимур Сидельников","Мария Щукина","Арсений Жданов",
               "Регина Лукина","Богдан Рыбаков","Наталья Устинова","Евгений Щёкин","Антон Бирюков"][i],
        role: ["Специалист по аренде","Бухгалтер объекта","Инженер","Офис-менеджер","Менеджер по клиентам",
               "Технический специалист","Кассир","Ресепшн","Охрана","Уборка и сервис"][i % 10],
        dept: ["Аренда","Бухгалтерия","Эксплуатация","Администрация","Клиентский сервис"][i % 5],
        location: `Объект ${i + 1}`,
        room: `${Math.floor(Math.random() * 3) + 1}0${(i % 9) + 2}`,
        phone: `доб. ${(i + 1) * 10 + 501}`,
        email: `obj${i + 1}b@company.ru`,
        initials: ["ПС","ГЛ","РП","ДС","МЧ","ЮЩ","ТХ","ИД","ЛЖ","КБ",
                   "СН","АМ","ВП","МГ","АР","НБ","КТ","СА","АП","ЯВ",
                   "ЗС","ЛК","ТА","ВП","ГХ","КЕ","ФМ","НЦ","ВБ","АР",
                   "ИК","ОЛ","ТС","МЩ","АЖ","РЛ","БР","НУ","ЕЩ","АБ"][i],
      },
    ],
  })),
];

const allEmployees = locationGroups.flatMap((g) => g.employees);

const deptColors: Record<string, string> = {
  Руководство:          "bg-[hsl(350,30%,90%)] text-[hsl(350,50%,30%)]",
  Продажи:              "bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)]",
  HR:                   "bg-[hsl(36,40%,88%)] text-[hsl(36,50%,30%)]",
  IT:                   "bg-[hsl(280,20%,90%)] text-[hsl(280,30%,30%)]",
  Бухгалтерия:          "bg-[hsl(130,20%,88%)] text-[hsl(130,30%,28%)]",
  Маркетинг:            "bg-[hsl(20,40%,88%)] text-[hsl(20,50%,30%)]",
  Юридический:          "bg-[hsl(180,25%,88%)] text-[hsl(180,35%,28%)]",
  Секретариат:          "bg-[hsl(45,40%,88%)] text-[hsl(45,50%,28%)]",
  АХО:                  "bg-[hsl(0,0%,88%)] text-[hsl(0,0%,35%)]",
  "Управление объектами":"bg-[hsl(350,25%,88%)] text-[hsl(350,45%,30%)]",
  Аренда:               "bg-[hsl(195,35%,88%)] text-[hsl(195,45%,30%)]",
  Администрация:        "bg-[hsl(55,35%,88%)] text-[hsl(55,45%,28%)]",
  Эксплуатация:         "bg-[hsl(160,25%,88%)] text-[hsl(160,35%,28%)]",
  "Клиентский сервис":  "bg-[hsl(270,20%,88%)] text-[hsl(270,30%,30%)]",
};

const avatarColors = [
  "hsl(350,60%,28%)", "hsl(210,45%,40%)", "hsl(36,60%,40%)", "hsl(130,40%,35%)",
  "hsl(280,30%,40%)", "hsl(20,60%,40%)", "hsl(180,35%,35%)", "hsl(45,60%,38%)",
];

export default function Reference() {
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [dbEmployees, setDbEmployees] = useState<Employee[] | null>(null);

  useEffect(() => {
    publicApi.getEmployees().then((data: Employee[]) => {
      if (Array.isArray(data) && data.length > 0) setDbEmployees(data);
    }).catch(() => {});
  }, []);

  // Используем данные из БД если есть, иначе статику
  const allEmployees = dbEmployees ?? locationGroups.flatMap((g) => g.employees);

  // Группируем по location
  const groupMap = new Map<string, Employee[]>();
  allEmployees.forEach((e) => {
    if (!groupMap.has(e.location)) groupMap.set(e.location, []);
    groupMap.get(e.location)!.push(e);
  });

  // Офис всегда первым, остальные сортируем
  const sortedLocations = Array.from(groupMap.keys()).sort((a, b) => {
    if (a === "Офис") return -1;
    if (b === "Офис") return 1;
    return a.localeCompare(b, "ru");
  });

  const dynamicGroups = sortedLocations.map((loc) => ({
    id: loc.toLowerCase().replace(/\s+/g, "-"),
    label: loc,
    icon: loc === "Офис" ? "Building2" : "MapPin",
    employees: groupMap.get(loc) || [],
  }));

  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set(dynamicGroups.slice(1).map((g) => g.id))
  );

  const q = search.toLowerCase().trim();

  const matchEmployee = (e: Employee) =>
    !q ||
    e.name.toLowerCase().includes(q) ||
    e.role.toLowerCase().includes(q) ||
    e.dept.toLowerCase().includes(q) ||
    e.location.toLowerCase().includes(q);

  const isSearching = q.length > 0;

  const toggleGroup = (id: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // При поиске — плоский список по всем группам
  const searchResults = isSearching ? allEmployees.filter(matchEmployee) : [];

  const totalFound = isSearching
    ? searchResults.length
    : allEmployees.length;

  return (
    <Layout title="Справочник" subtitle="Каталог сотрудников по объектам" icon="BookMarked">
      {/* Поиск */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-5 mb-5">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по ФИО, должности, отделу или объекту…"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[hsl(var(--beige))] border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--burgundy))]/20 font-golos"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
          <span className="flex items-center text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--beige))] px-3 rounded-lg border border-border whitespace-nowrap">
            {isSearching ? `Найдено: ${totalFound}` : `Всего: ${totalFound}`}
          </span>
        </div>
        {isSearching && (
          <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-2 pl-1">
            Поиск по всем объектам и офису
          </p>
        )}
      </div>

      <div className="flex gap-5">
        <div className="flex-1 min-w-0">

          {/* Режим поиска — плоский список */}
          {isSearching ? (
            searchResults.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-border">
                <Icon name="UserX" size={32} className="mx-auto mb-3 opacity-30 text-[hsl(var(--muted-foreground))]" />
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Сотрудники не найдены</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-border bg-[hsl(var(--beige-dark))]">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                    Результаты поиска
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 p-4">
                  {searchResults.map((emp, i) => (
                    <EmployeeCard
                      key={emp.id}
                      emp={emp}
                      i={i}
                      selected={selectedEmployee?.id === emp.id}
                      onClick={() => setSelectedEmployee(selectedEmployee?.id === emp.id ? null : emp)}
                      showLocation
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            /* Режим групп по объектам */
            <div className="space-y-3">
              {dynamicGroups.map((group) => {
                const isCollapsed = collapsedGroups.has(group.id);
                return (
                  <div key={group.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                    {/* Заголовок группы */}
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-[hsl(var(--beige))] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          group.id === "office"
                            ? "bg-[hsl(var(--burgundy))]"
                            : "bg-[hsl(var(--burgundy-pale))]"
                        }`}>
                          <Icon
                            name={group.icon}
                            size={15}
                            className={group.id === "office" ? "text-white" : "text-[hsl(var(--burgundy))]"}
                            fallback="Building2"
                          />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{group.label}</p>
                          <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                            {group.employees.length} {group.employees.length === 1 ? "сотрудник" : group.employees.length < 5 ? "сотрудника" : "сотрудников"}
                          </p>
                        </div>
                      </div>
                      <Icon
                        name={isCollapsed ? "ChevronDown" : "ChevronUp"}
                        size={16}
                        className="text-[hsl(var(--muted-foreground))]"
                      />
                    </button>

                    {/* Карточки сотрудников */}
                    {!isCollapsed && (
                      <div className="border-t border-border px-4 pb-4 pt-3">
                        <div className="grid grid-cols-3 gap-3">
                          {group.employees.map((emp, i) => (
                            <EmployeeCard
                              key={emp.id}
                              emp={emp}
                              i={i}
                              selected={selectedEmployee?.id === emp.id}
                              onClick={() => setSelectedEmployee(selectedEmployee?.id === emp.id ? null : emp)}
                              showLocation={false}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Карточка сотрудника */}
        {selectedEmployee && (
          <div className="w-60 flex-shrink-0">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden sticky top-6">
              <div className="bg-[hsl(var(--burgundy))] p-5 text-center relative">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Icon name="X" size={12} className="text-white" />
                </button>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 text-white text-lg font-bold">
                  {selectedEmployee.initials}
                </div>
                <p className="text-sm font-semibold text-white">{selectedEmployee.name}</p>
                <p className="text-xs text-white/70 mt-0.5 leading-snug">{selectedEmployee.role}</p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-sm">
                    {selectedEmployee.dept}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={13} className="text-[hsl(var(--muted-foreground))] flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Объект / кабинет</p>
                    <p className="text-xs font-medium text-[hsl(var(--foreground))]">
                      {selectedEmployee.location}, {selectedEmployee.room}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={13} className="text-[hsl(var(--muted-foreground))] flex-shrink-0" />
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
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon name="Mail" size={13} className="text-[hsl(var(--muted-foreground))] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Email</p>
                      <p className="text-xs font-medium text-[hsl(var(--burgundy))] truncate max-w-[120px]">
                        {selectedEmployee.email}
                      </p>
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

interface EmployeeCardProps {
  emp: Employee;
  i: number;
  selected: boolean;
  onClick: () => void;
  showLocation: boolean;
}

function EmployeeCard({ emp, i, selected, onClick, showLocation }: EmployeeCardProps) {
  const avatarColors = [
    "hsl(350,60%,28%)", "hsl(210,45%,40%)", "hsl(36,60%,40%)", "hsl(130,40%,35%)",
    "hsl(280,30%,40%)", "hsl(20,60%,40%)", "hsl(180,35%,35%)", "hsl(45,60%,38%)",
  ];
  const deptColors: Record<string, string> = {
    Руководство:          "bg-[hsl(350,30%,90%)] text-[hsl(350,50%,30%)]",
    Продажи:              "bg-[hsl(210,35%,88%)] text-[hsl(210,45%,30%)]",
    HR:                   "bg-[hsl(36,40%,88%)] text-[hsl(36,50%,30%)]",
    IT:                   "bg-[hsl(280,20%,90%)] text-[hsl(280,30%,30%)]",
    Бухгалтерия:          "bg-[hsl(130,20%,88%)] text-[hsl(130,30%,28%)]",
    Маркетинг:            "bg-[hsl(20,40%,88%)] text-[hsl(20,50%,30%)]",
    Юридический:          "bg-[hsl(180,25%,88%)] text-[hsl(180,35%,28%)]",
    Секретариат:          "bg-[hsl(45,40%,88%)] text-[hsl(45,50%,28%)]",
    АХО:                  "bg-[hsl(0,0%,88%)] text-[hsl(0,0%,35%)]",
    "Управление объектами":"bg-[hsl(350,25%,88%)] text-[hsl(350,45%,30%)]",
    Аренда:               "bg-[hsl(195,35%,88%)] text-[hsl(195,45%,30%)]",
    Администрация:        "bg-[hsl(55,35%,88%)] text-[hsl(55,45%,28%)]",
    Эксплуатация:         "bg-[hsl(160,25%,88%)] text-[hsl(160,35%,28%)]",
    "Клиентский сервис":  "bg-[hsl(270,20%,88%)] text-[hsl(270,30%,30%)]",
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
        selected
          ? "border-[hsl(var(--burgundy))] shadow-md bg-white"
          : "border-border bg-white hover:border-[hsl(var(--burgundy))]/30"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
          style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
        >
          {emp.initials}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[hsl(var(--foreground))] leading-snug truncate">{emp.name}</p>
          <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-snug truncate">{emp.role}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-1 flex-wrap">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${deptColors[emp.dept] || "bg-[hsl(var(--muted))]"}`}>
          {emp.dept}
        </span>
        {showLocation && (
          <span className="text-[10px] text-[hsl(var(--muted-foreground))] flex items-center gap-0.5">
            <Icon name="MapPin" size={9} />
            {emp.location}
          </span>
        )}
      </div>
    </div>
  );
}