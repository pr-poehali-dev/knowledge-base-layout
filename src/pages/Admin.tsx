import { useState } from "react";
import { clearAdminToken, getAdminToken } from "@/lib/adminApi";
import Icon from "@/components/ui/icon";
import { AdminLogin, Section } from "@/components/admin/AdminShared";
import {
  EmployeesSection,
  NewsSection,
  DocumentsSection,
  PresentationsSection,
  SettingsSection,
} from "@/components/admin/AdminSections";

// ─── Навигация ────────────────────────────────────────────────────────────────
const navItems: { id: Section; label: string; icon: string }[] = [
  { id: "employees",     label: "Сотрудники",   icon: "Users" },
  { id: "news",          label: "Новости",       icon: "Newspaper" },
  { id: "documents",     label: "Документы",     icon: "FileText" },
  { id: "presentations", label: "Презентации",   icon: "Presentation" },
  { id: "settings",      label: "Настройки",     icon: "Settings" },
];

// ─── Главная панель ───────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(!!getAdminToken());
  const [section, setSection] = useState<Section>("employees");

  const logout = () => { clearAdminToken(); setAuthed(false); };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[hsl(var(--beige))] font-golos flex flex-col">
      {/* Шапка */}
      <header className="bg-[hsl(var(--burgundy))] text-white px-8 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center">
            <Icon name="ShieldCheck" size={17} className="text-white" />
          </div>
          <div>
            <span className="font-cormorant text-xl font-semibold">Панель администратора</span>
            <span className="text-white/50 mx-2 text-xs">|</span>
            <span className="text-white/70 text-sm">База знаний</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
            <Icon name="ExternalLink" size={13} />
            На сайт
          </a>
          <button onClick={logout} className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-3 py-1.5 rounded-full text-sm transition-colors">
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1200px] mx-auto w-full px-6 py-8 gap-6">
        {/* Боковое меню */}
        <aside className="w-48 flex-shrink-0">
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden sticky top-6">
            <div className="px-4 py-3 border-b border-border bg-[hsl(var(--beige-dark))]">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Разделы</span>
            </div>
            <nav className="p-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs font-medium transition-all mb-0.5 text-left ${
                    section === item.id
                      ? "bg-[hsl(var(--burgundy))] text-white"
                      : "text-[hsl(var(--foreground))]/70 hover:bg-[hsl(var(--burgundy-pale))] hover:text-[hsl(var(--burgundy))]"
                  }`}
                >
                  <Icon name={item.icon} size={15} className={section === item.id ? "text-white" : "text-[hsl(var(--burgundy))]"} fallback="Circle" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Контент */}
        <main className="flex-1 min-w-0">
          {section === "employees"     && <EmployeesSection />}
          {section === "news"          && <NewsSection />}
          {section === "documents"     && <DocumentsSection />}
          {section === "presentations" && <PresentationsSection />}
          {section === "settings"      && <SettingsSection onLogout={logout} />}
        </main>
      </div>
    </div>
  );
}
