import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const categories = [
  {
    topic: "Вопросы по зарплате, отпуску, больничному",
    dept: "HR-отдел",
    person: "Наталья Петрова",
    phone: "+7 (495) 123-45-67 доб. 201",
    email: "hr@company.ru",
    icon: "Users",
  },
  {
    topic: "Проблемы с компьютером, доступом, почтой",
    dept: "IT-служба поддержки",
    person: "Дмитрий Волков",
    phone: "+7 (495) 123-45-67 доб. 100",
    email: "it-help@company.ru",
    icon: "Monitor",
  },
  {
    topic: "Авансовые отчёты, командировки, оплата",
    dept: "Бухгалтерия",
    person: "Елена Новикова",
    phone: "+7 (495) 123-45-67 доб. 305",
    email: "buh@company.ru",
    icon: "Calculator",
  },
  {
    topic: "Договоры, юридические вопросы, НДА",
    dept: "Юридический отдел",
    person: "Ольга Захарова",
    phone: "+7 (495) 123-45-67 доб. 410",
    email: "legal@company.ru",
    icon: "Scale",
  },
  {
    topic: "Корпоративные мероприятия, обучение",
    dept: "Отдел обучения",
    person: "Татьяна Белова",
    phone: "+7 (495) 123-45-67 доб. 215",
    email: "edu@company.ru",
    icon: "GraduationCap",
  },
  {
    topic: "Реклама, брендинг, PR, медиа",
    dept: "Отдел маркетинга",
    person: "Сергей Фёдоров",
    phone: "+7 (495) 123-45-67 доб. 320",
    email: "marketing@company.ru",
    icon: "Megaphone",
  },
  {
    topic: "Хозяйственные вопросы, пропуски, охрана",
    dept: "АХО",
    person: "Виктор Сидоров",
    phone: "+7 (495) 123-45-67 доб. 001",
    email: "aho@company.ru",
    icon: "Building",
  },
  {
    topic: "Общие вопросы, приёмная",
    dept: "Секретариат",
    person: "Алина Громова",
    phone: "+7 (495) 123-45-67",
    email: "info@company.ru",
    icon: "PhoneCall",
  },
];

export default function Contacts() {
  return (
    <Layout title="К кому обращаться, если…" subtitle="Быстрый поиск ответственного по теме" icon="HelpCircle">
      {/* Подсказка */}
      <div className="flex items-start gap-3 bg-[hsl(var(--burgundy-pale))] border border-[hsl(var(--burgundy))]/20 rounded-xl p-4 mb-5">
        <Icon name="Lightbulb" size={16} className="text-[hsl(var(--burgundy))] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[hsl(var(--foreground))]/80 leading-relaxed">
          Найдите вашу ситуацию в списке ниже и свяжитесь с нужным специалистом напрямую.
          Если не нашли — обращайтесь в секретариат.
        </p>
      </div>

      {/* Карточки контактов */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((c) => (
          <div
            key={c.dept}
            className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-[hsl(var(--beige-dark))]">
              <div className="w-8 h-8 rounded-lg bg-[hsl(var(--burgundy-pale))] flex items-center justify-center flex-shrink-0">
                <Icon name={c.icon} size={15} className="text-[hsl(var(--burgundy))]" fallback="User" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{c.dept}</p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{c.person}</p>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-3 italic">
                «{c.topic}»
              </p>
              <div className="space-y-1.5">
                <a
                  href={`tel:${c.phone}`}
                  className="flex items-center gap-2 text-xs text-[hsl(var(--foreground))]/80 hover:text-[hsl(var(--burgundy))] transition-colors"
                >
                  <Icon name="Phone" size={12} className="text-[hsl(var(--burgundy))]" />
                  {c.phone}
                </a>
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-2 text-xs text-[hsl(var(--foreground))]/80 hover:text-[hsl(var(--burgundy))] transition-colors"
                >
                  <Icon name="Mail" size={12} className="text-[hsl(var(--burgundy))]" />
                  {c.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
