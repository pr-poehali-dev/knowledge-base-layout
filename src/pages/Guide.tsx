import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const steps = [
  {
    num: "01",
    title: "Откройте нужный раздел",
    desc: "В левом меню выберите раздел — например, «Документы» или «Справочник». Каждый раздел отвечает за свою тему.",
    img: "📂",
  },
  {
    num: "02",
    title: "Воспользуйтесь поиском",
    desc: "Введите ключевое слово в строку поиска вверху страницы. Система найдёт нужный материал по всей базе.",
    img: "🔍",
  },
  {
    num: "03",
    title: "Скачайте или скопируйте файл",
    desc: "Нажмите кнопку «Скачать» рядом с нужным документом. Файл сохранится на ваш компьютер в формате PDF или DOCX.",
    img: "⬇️",
  },
  {
    num: "04",
    title: "Следите за обновлениями",
    desc: "Блок «Свежие обновления» на главной показывает, что изменилось. Заходите сюда в начале рабочего дня.",
    img: "🔔",
  },
  {
    num: "05",
    title: "Сообщите об ошибке",
    desc: "Если нашли устаревшую информацию — нажмите «Сообщить об ошибке» внизу страницы или напишите ответственному.",
    img: "✉️",
  },
];

const faq = [
  {
    q: "Как открыть файл PDF?",
    a: "Нажмите кнопку «Скачать» — файл сохранится на ваш компьютер. Откройте его через браузер или Adobe Acrobat. Если файл не открывается, обратитесь в IT-поддержку.",
  },
  {
    q: "Почему не скачивается документ?",
    a: "Возможные причины: медленное соединение, блокировка браузером или отсутствие прав доступа. Попробуйте другой браузер или обратитесь в IT: it-help@company.ru.",
  },
  {
    q: "Как сообщить об ошибке в статье?",
    a: "Нажмите кнопку «Сообщить об ошибке» в подвале любой страницы и опишите проблему. Ответственный редактор получит уведомление и исправит материал.",
  },
  {
    q: "Кто может редактировать базу знаний?",
    a: "Только назначенные редакторы отделов. Сотрудники — просматривают и оставляют обратную связь через форму.",
  },
  {
    q: "Как найти контакты коллеги?",
    a: "Откройте раздел «Справочник» — там есть каталог сотрудников с поиском по имени, отделу и должности.",
  },
  {
    q: "База знаний работает на мобильном?",
    a: "Да, портал адаптирован для смартфонов и планшетов. Откройте его через браузер на любом устройстве.",
  },
];

const support = [
  {
    icon: "Monitor",
    title: "IT-поддержка",
    desc: "Технические проблемы, доступ, ошибки системы",
    contact: "it-help@company.ru",
    phone: "доб. 100",
  },
  {
    icon: "BookOpen",
    title: "Редактор базы знаний",
    desc: "Ошибки в материалах, предложения по содержанию",
    contact: "kb@company.ru",
    phone: "доб. 212",
  },
  {
    icon: "Users",
    title: "HR-отдел",
    desc: "Вопросы по адаптации, онбордингу, доступам",
    contact: "hr@company.ru",
    phone: "доб. 201",
  },
];

export default function Guide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout title="Как пользоваться БЗ" subtitle="Стартовый раздел для новых сотрудников" icon="BookOpen">

      {/* Приветственный баннер */}
      <div className="bg-[hsl(var(--burgundy))] rounded-xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-40 opacity-5 flex items-center justify-center">
          <span className="text-[120px] leading-none">📖</span>
        </div>
        <p className="text-white/60 text-[10px] uppercase tracking-widest font-semibold mb-2">Добро пожаловать!</p>
        <h2 className="font-cormorant text-2xl font-semibold mb-2">
          База знаний — ваш рабочий помощник
        </h2>
        <p className="text-white/75 text-sm leading-relaxed max-w-xl">
          Здесь собрана вся информация, которая нужна для работы: регламенты, контакты, 
          документы, обучающие материалы. Ниже — три шага, чтобы освоиться за 5 минут.
        </p>
      </div>

      {/* Три главных блока */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Видео-гайд */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="bg-[hsl(var(--beige-dark))] px-5 py-3 border-b border-border flex items-center gap-2">
            <Icon name="Play" size={14} className="text-[hsl(var(--burgundy))]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              Видео-гайд
            </span>
          </div>
          <div className="p-5">
            {/* Превью видео */}
            <div className="w-full aspect-video bg-[hsl(var(--burgundy))] rounded-lg flex flex-col items-center justify-center mb-4 cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,white,white_1px,transparent_1px,transparent_12px)]" />
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover:bg-white/30 transition-colors">
                <Icon name="Play" size={20} className="text-white ml-1" />
              </div>
              <span className="text-white/80 text-xs">1:48 · Обзор платформы</span>
              <div className="absolute bottom-2 right-2 bg-black/40 text-white text-[10px] px-1.5 py-0.5 rounded">
                1:48
              </div>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
              Запись экрана: как использовать поиск, переходить по разделам и скачивать файлы. 
              Рекомендуем посмотреть в первый рабочий день.
            </p>
          </div>
        </div>

        {/* Пошаговая инструкция */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="bg-[hsl(var(--beige-dark))] px-5 py-3 border-b border-border flex items-center gap-2">
            <Icon name="ListOrdered" size={14} className="text-[hsl(var(--burgundy))]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              Инструкция
            </span>
          </div>
          <div className="p-5 space-y-4">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[hsl(var(--burgundy-pale))] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-cormorant text-sm font-semibold text-[hsl(var(--burgundy))]">
                    {step.num.replace("0", "")}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[hsl(var(--foreground))] leading-snug">{step.title}</p>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))] leading-relaxed mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Поддержка */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="bg-[hsl(var(--beige-dark))] px-5 py-3 border-b border-border flex items-center gap-2">
            <Icon name="Headphones" size={14} className="text-[hsl(var(--burgundy))]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              Помощь
            </span>
          </div>
          <div className="p-5 space-y-4">
            {support.map((s) => (
              <div key={s.title} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--burgundy-pale))] flex items-center justify-center flex-shrink-0">
                  <Icon name={s.icon} size={14} className="text-[hsl(var(--burgundy))]" fallback="User" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{s.title}</p>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))] leading-snug mb-1.5">{s.desc}</p>
                  <a href={`mailto:${s.contact}`} className="text-[11px] text-[hsl(var(--burgundy))] hover:underline block">
                    {s.contact}
                  </a>
                  <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{s.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-[hsl(var(--beige-dark))] flex items-center gap-2">
          <Icon name="HelpCircle" size={15} className="text-[hsl(var(--burgundy))]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Часто задаваемые вопросы
          </span>
        </div>
        <div className="divide-y divide-border">
          {faq.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[hsl(var(--beige))] transition-colors"
              >
                <span className="text-sm font-medium text-[hsl(var(--foreground))] pr-4">{item.q}</span>
                <Icon
                  name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-[hsl(var(--muted-foreground))] flex-shrink-0"
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed pl-0">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
