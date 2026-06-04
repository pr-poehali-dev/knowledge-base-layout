import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const steps = [
  {
    num: "01",
    title: "Зарегистрируйтесь в системе",
    desc: "Используйте корпоративный email для входа. Логин и временный пароль высылаются на почту в первый рабочий день.",
  },
  {
    num: "02",
    title: "Изучите структуру разделов",
    desc: "База знаний делится на 7 разделов. Каждый раздел содержит материалы по своей теме — документы, инструкции, контакты.",
  },
  {
    num: "03",
    title: "Используйте поиск",
    desc: "Строка поиска находится вверху каждой страницы. Введите ключевое слово — система найдёт нужный материал по всем разделам.",
  },
  {
    num: "04",
    title: "Следите за обновлениями",
    desc: "В блоке «Свежие обновления» на главной всегда видно, что изменилось в базе последним. Заходите туда в начале рабочего дня.",
  },
  {
    num: "05",
    title: "Предлагайте изменения",
    desc: "Если нашли ошибку или хотите добавить материал — нажмите «Сообщить об ошибке» внизу страницы или напишите ответственному редактору.",
  },
];

const faq = [
  { q: "Кто может редактировать базу знаний?", a: "Редактировать материалы могут назначенные редакторы каждого отдела. Обычные сотрудники — только просматривают и оставляют комментарии." },
  { q: "Как часто обновляется база?", a: "Обновления происходят по мере изменений: регламенты — при их пересмотре, новости — ежедневно, справочник — еженедельно." },
  { q: "Что делать, если не нашёл нужную информацию?", a: "Напишите в раздел «К кому обращаться» — там есть контакты ответственных по каждой теме." },
  { q: "Можно ли скачать документы?", a: "Да, большинство документов доступны для скачивания в форматах PDF и DOCX." },
];

export default function Guide() {
  return (
    <Layout title="Как пользоваться БЗ" subtitle="Инструкция для новых и опытных сотрудников" icon="BookOpen">
      {/* Введение */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[hsl(var(--burgundy-pale))] flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={20} className="text-[hsl(var(--burgundy))]" />
          </div>
          <div>
            <h2 className="font-cormorant text-xl font-semibold text-[hsl(var(--foreground))] mb-1">
              Добро пожаловать в Базу знаний
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Это единое корпоративное хранилище всей важной информации компании. Здесь вы найдёте регламенты, инструкции, 
              контакты, шаблоны документов и многое другое. Чтобы начать работу — ознакомьтесь с инструкцией ниже.
            </p>
          </div>
        </div>
      </div>

      {/* Шаги */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden mb-5">
        <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))]">
          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Пошаговая инструкция
          </span>
        </div>
        <div className="divide-y divide-border">
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-5 px-6 py-5 hover:bg-[hsl(var(--beige))] transition-colors">
              <div className="font-cormorant text-3xl font-semibold text-[hsl(var(--burgundy))]/30 leading-none w-10 flex-shrink-0 pt-0.5">
                {step.num}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1">{step.title}</h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))]">
          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Частые вопросы
          </span>
        </div>
        <div className="divide-y divide-border">
          {faq.map((item, i) => (
            <div key={i} className="px-6 py-4">
              <div className="flex items-start gap-3">
                <Icon name="HelpCircle" size={15} className="text-[hsl(var(--burgundy))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-1">{item.q}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
