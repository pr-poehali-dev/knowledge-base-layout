import { useState, useEffect, useCallback } from "react";
import { adminApi, clearAdminToken, getAdminToken } from "@/lib/adminApi";
import Icon from "@/components/ui/icon";

// ─── Типы ───────────────────────────────────────────────────────────────────
interface Employee { id: number; name: string; role: string; dept: string; location: string; room: string; phone: string; email: string; initials: string; }
interface NewsItem  { id: number; title: string; excerpt: string; category: string; is_published: boolean; published_at: string; }
interface Document  { id: number; title: string; description: string; category: string; file_type: string; file_size: string; file_url: string; version: string; is_template: boolean; updated_at: string; }
interface Presentation { id: number; title: string; description: string; category: string; audience: string; slides_count: number; file_size: string; file_url: string; author: string; is_new: boolean; updated_at: string; }

type Section = "employees" | "news" | "documents" | "presentations" | "settings";

// ─── Логин ───────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await adminApi.login(password);
      if (res.ok) onLogin();
      else setError("Неверный пароль");
    } catch (_e) { /* ignore */ setError("Ошибка соединения"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--beige))] flex items-center justify-center font-golos">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--burgundy))] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Icon name="ShieldCheck" size={24} className="text-white" />
          </div>
          <h1 className="font-cormorant text-2xl font-semibold text-[hsl(var(--foreground))]">Панель администратора</h1>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Только для уполномоченных сотрудников</p>
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-xl p-7">
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <Icon name="Lock" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Пароль администратора" autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-[hsl(var(--beige))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--burgundy))]/20 font-golos"
              />
            </div>
            {error && <p className="text-xs text-red-500 flex items-center gap-1.5"><Icon name="AlertCircle" size={13}/>{error}</p>}
            <button type="submit" disabled={loading || !password}
              className="w-full bg-[hsl(var(--burgundy))] text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? "Проверяем…" : "Войти"}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-4">
          <a href="/" className="text-[hsl(var(--burgundy))] hover:underline">← Вернуться на сайт</a>
        </p>
      </div>
    </div>
  );
}

// ─── Общие компоненты ────────────────────────────────────────────────────────
function SectionHeader({ title, onAdd, addLabel }: { title: string; onAdd: () => void; addLabel: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-cormorant text-xl font-semibold text-[hsl(var(--foreground))]">{title}</h2>
      <button onClick={onAdd} className="flex items-center gap-2 bg-[hsl(var(--burgundy))] text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
        <Icon name="Plus" size={15} /> {addLabel}
      </button>
    </div>
  );
}

function Table({ cols, rows, onEdit, onDelete }: { cols: string[]; rows: (string | React.ReactNode)[][]; onEdit: (i: number) => void; onDelete: (i: number) => void }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-[hsl(var(--beige-dark))]">
            {cols.map(c => <th key={c} className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">{c}</th>)}
            <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] text-right">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.length === 0 && (
            <tr><td colSpan={cols.length + 1} className="text-center py-10 text-sm text-[hsl(var(--muted-foreground))]">Нет записей — добавьте первую</td></tr>
          )}
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[hsl(var(--beige))] transition-colors">
              {row.map((cell, j) => <td key={j} className="px-5 py-3 text-sm text-[hsl(var(--foreground))]">{cell}</td>)}
              <td className="px-5 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onEdit(i)} className="text-xs text-[hsl(var(--burgundy))] hover:underline flex items-center gap-1"><Icon name="Pencil" size={12}/>Изменить</button>
                  <button onClick={() => onDelete(i)} className="text-xs text-red-500 hover:underline flex items-center gap-1"><Icon name="Trash2" size={12}/>Удалить</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Modal({ title, onClose, onSave, children }: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-white">
          <h3 className="font-semibold text-[hsl(var(--foreground))]">{title}</h3>
          <button onClick={onClose}><Icon name="X" size={18} className="text-[hsl(var(--muted-foreground))]"/></button>
        </div>
        <div className="px-6 py-5 space-y-4">{children}</div>
        <div className="flex gap-3 px-6 py-4 border-t border-border sticky bottom-0 bg-white">
          <button onClick={onSave} className="flex-1 bg-[hsl(var(--burgundy))] text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-90">Сохранить</button>
          <button onClick={onClose} className="flex-1 border border-border py-2.5 rounded-lg text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--beige))]">Отмена</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">{label}</label>{children}</div>;
}

const inputCls = "w-full px-3 py-2.5 rounded-lg border border-border bg-[hsl(var(--beige))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--burgundy))]/20 font-golos";
const selectCls = inputCls;

// ─── Секции ──────────────────────────────────────────────────────────────────

function EmployeesSection() {
  const [items, setItems] = useState<Employee[]>([]);
  const [modal, setModal] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", role: "", dept: "", location: "Офис", room: "", phone: "", email: "", initials: "" });
  const [loading, setLoading] = useState(true);

  const locations = ["Офис", ...Array.from({ length: 40 }, (_, i) => `Объект ${i + 1}`)];

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await adminApi.getEmployees()); } catch (_e) { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const open = (idx?: number) => {
    if (idx !== undefined) { setForm({ ...items[idx] }); setEditIdx(idx); }
    else { setForm({ name: "", role: "", dept: "", location: "Офис", room: "", phone: "", email: "", initials: "" }); setEditIdx(null); }
    setModal(true);
  };

  const save = async () => {
    try {
      if (editIdx !== null) await adminApi.updateEmployee(items[editIdx].id, form);
      else await adminApi.createEmployee(form);
      setModal(false); load();
    } catch (e: unknown) { alert((e as Error).message); }
  };

  const del = async (idx: number) => {
    if (!confirm(`Удалить сотрудника ${items[idx].name}?`)) return;
    await adminApi.deleteEmployee(items[idx].id); load();
  };

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      <SectionHeader title="Сотрудники" onAdd={() => open()} addLabel="Добавить сотрудника" />
      {loading ? <p className="text-sm text-[hsl(var(--muted-foreground))]">Загрузка…</p> : (
        <Table
          cols={["ФИО", "Должность", "Отдел", "Объект", "Телефон", "Email"]}
          rows={items.map(e => [e.name, e.role, e.dept, e.location, e.phone, e.email])}
          onEdit={open} onDelete={del}
        />
      )}
      {modal && (
        <Modal title={editIdx !== null ? "Редактировать сотрудника" : "Новый сотрудник"} onClose={() => setModal(false)} onSave={save}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="ФИО *"><input className={inputCls} value={form.name} onChange={f("name")} placeholder="Иванов Иван Иванович" /></Field>
            <Field label="Инициалы"><input className={inputCls} value={form.initials} onChange={f("initials")} placeholder="ИИ" maxLength={3} /></Field>
          </div>
          <Field label="Должность *"><input className={inputCls} value={form.role} onChange={f("role")} placeholder="Менеджер по продажам" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Отдел *"><input className={inputCls} value={form.dept} onChange={f("dept")} placeholder="Продажи" /></Field>
            <Field label="Объект / Офис *">
              <select className={selectCls} value={form.location} onChange={f("location")}>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Кабинет"><input className={inputCls} value={form.room} onChange={f("room")} placeholder="301" /></Field>
            <Field label="Телефон"><input className={inputCls} value={form.phone} onChange={f("phone")} placeholder="доб. 150" /></Field>
          </div>
          <Field label="Email"><input className={inputCls} value={form.email} onChange={f("email")} placeholder="ivanov@company.ru" /></Field>
        </Modal>
      )}
    </div>
  );
}

function NewsSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [modal, setModal] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", category: "Общее", is_published: true });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await adminApi.getAllNews()); } catch (_e) { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const open = (idx?: number) => {
    if (idx !== undefined) { setForm({ title: items[idx].title, excerpt: items[idx].excerpt || "", category: items[idx].category, is_published: items[idx].is_published }); setEditIdx(idx); }
    else { setForm({ title: "", excerpt: "", category: "Общее", is_published: true }); setEditIdx(null); }
    setModal(true);
  };

  const save = async () => {
    try {
      if (editIdx !== null) await adminApi.updateNews(items[editIdx].id, form);
      else await adminApi.createNews(form);
      setModal(false); load();
    } catch (e: unknown) { alert((e as Error).message); }
  };

  const del = async (idx: number) => {
    if (!confirm("Удалить новость?")) return;
    await adminApi.deleteNews(items[idx].id); load();
  };

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: k === "is_published" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const categories = ["Общее", "Важно", "Мероприятия", "Кадры", "IT", "Финансы"];

  return (
    <div>
      <SectionHeader title="Новости и объявления" onAdd={() => open()} addLabel="Добавить новость" />
      {loading ? <p className="text-sm text-[hsl(var(--muted-foreground))]">Загрузка…</p> : (
        <Table
          cols={["Заголовок", "Категория", "Опубликована", "Дата"]}
          rows={items.map(n => [n.title, n.category, n.is_published ? "✓ Да" : "— Нет", n.published_at?.slice(0, 10) || ""])}
          onEdit={open} onDelete={del}
        />
      )}
      {modal && (
        <Modal title={editIdx !== null ? "Редактировать новость" : "Новая новость"} onClose={() => setModal(false)} onSave={save}>
          <Field label="Заголовок *"><input className={inputCls} value={form.title} onChange={f("title")} placeholder="Заголовок новости" /></Field>
          <Field label="Краткое описание">
            <textarea className={inputCls} rows={3} value={form.excerpt} onChange={f("excerpt")} placeholder="Краткий текст для ленты на главной…" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Категория">
              <select className={selectCls} value={form.category} onChange={f("category")}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Статус">
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={f("is_published")} className="w-4 h-4 accent-[hsl(var(--burgundy))]" />
                <span className="text-sm">Опубликована</span>
              </label>
            </Field>
          </div>
        </Modal>
      )}
    </div>
  );
}

function DocumentsSection() {
  const [items, setItems] = useState<Document[]>([]);
  const [modal, setModal] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "Кадровые документы", file_type: "PDF", file_size: "", file_url: "", version: "1.0", is_template: false });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await adminApi.getDocuments()); } catch (_e) { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const open = (idx?: number) => {
    if (idx !== undefined) {
      const d = items[idx];
      setForm({ title: d.title, description: d.description || "", category: d.category, file_type: d.file_type, file_size: d.file_size || "", file_url: d.file_url || "", version: d.version, is_template: d.is_template });
      setEditIdx(idx);
    } else {
      setForm({ title: "", description: "", category: "Кадровые документы", file_type: "PDF", file_size: "", file_url: "", version: "1.0", is_template: false });
      setEditIdx(null);
    }
    setModal(true);
  };

  const save = async () => {
    try {
      if (editIdx !== null) await adminApi.updateDocument(items[editIdx].id, form);
      else await adminApi.createDocument(form);
      setModal(false); load();
    } catch (e: unknown) { alert((e as Error).message); }
  };

  const del = async (idx: number) => {
    if (!confirm("Удалить документ?")) return;
    await adminApi.deleteDocument(items[idx].id); load();
  };

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: k === "is_template" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const docCategories = ["Кадровые документы", "Финансовые документы", "Юридические документы", "Безопасность и охрана труда"];

  return (
    <div>
      <SectionHeader title="Документы" onAdd={() => open()} addLabel="Добавить документ" />
      {loading ? <p className="text-sm text-[hsl(var(--muted-foreground))]">Загрузка…</p> : (
        <Table
          cols={["Название", "Категория", "Тип", "Версия", "Обновлён"]}
          rows={items.map(d => [d.title, d.category, d.file_type, `v${d.version}`, d.updated_at?.slice(0, 10) || ""])}
          onEdit={open} onDelete={del}
        />
      )}
      {modal && (
        <Modal title={editIdx !== null ? "Редактировать документ" : "Новый документ"} onClose={() => setModal(false)} onSave={save}>
          <Field label="Название *"><input className={inputCls} value={form.title} onChange={f("title")} placeholder="Регламент командировок" /></Field>
          <Field label="Описание">
            <textarea className={inputCls} rows={2} value={form.description} onChange={f("description")} placeholder="Краткое описание документа…" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Категория">
              <select className={selectCls} value={form.category} onChange={f("category")}>
                {docCategories.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Тип файла">
              <select className={selectCls} value={form.file_type} onChange={f("file_type")}>
                {["PDF", "DOCX", "XLSX", "PPTX"].map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Версия"><input className={inputCls} value={form.version} onChange={f("version")} placeholder="1.0" /></Field>
            <Field label="Размер файла"><input className={inputCls} value={form.file_size} onChange={f("file_size")} placeholder="1.2 МБ" /></Field>
          </div>
          <Field label="Ссылка на файл (URL)"><input className={inputCls} value={form.file_url} onChange={f("file_url")} placeholder="https://…" /></Field>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_template} onChange={f("is_template")} className="w-4 h-4 accent-[hsl(var(--burgundy))]" />
            <span className="text-sm">Это шаблон (есть образец заполнения)</span>
          </label>
        </Modal>
      )}
    </div>
  );
}

function PresentationsSection() {
  const [items, setItems] = useState<Presentation[]>([]);
  const [modal, setModal] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "Внешние", audience: "external", slides_count: 0, file_size: "", file_url: "", author: "", is_new: false });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await adminApi.getPresentations()); } catch (_e) { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const open = (idx?: number) => {
    if (idx !== undefined) {
      const p = items[idx];
      setForm({ title: p.title, description: p.description || "", category: p.category, audience: p.audience, slides_count: p.slides_count, file_size: p.file_size || "", file_url: p.file_url || "", author: p.author || "", is_new: p.is_new });
      setEditIdx(idx);
    } else {
      setForm({ title: "", description: "", category: "Внешние", audience: "external", slides_count: 0, file_size: "", file_url: "", author: "", is_new: false });
      setEditIdx(null);
    }
    setModal(true);
  };

  const save = async () => {
    try {
      if (editIdx !== null) await adminApi.updatePresentation(items[editIdx].id, form);
      else await adminApi.createPresentation(form);
      setModal(false); load();
    } catch (e: unknown) { alert((e as Error).message); }
  };

  const del = async (idx: number) => {
    if (!confirm("Удалить презентацию?")) return;
    await adminApi.deletePresentation(items[idx].id); load();
  };

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: k === "is_new" ? (e.target as HTMLInputElement).checked : k === "slides_count" ? Number(e.target.value) : e.target.value }));

  return (
    <div>
      <SectionHeader title="Презентации" onAdd={() => open()} addLabel="Добавить презентацию" />
      {loading ? <p className="text-sm text-[hsl(var(--muted-foreground))]">Загрузка…</p> : (
        <Table
          cols={["Название", "Категория", "Аудитория", "Слайдов", "Автор"]}
          rows={items.map(p => [p.title, p.category, p.audience === "external" ? "Внешняя" : "Внутренняя", String(p.slides_count), p.author])}
          onEdit={open} onDelete={del}
        />
      )}
      {modal && (
        <Modal title={editIdx !== null ? "Редактировать презентацию" : "Новая презентация"} onClose={() => setModal(false)} onSave={save}>
          <Field label="Название *"><input className={inputCls} value={form.title} onChange={f("title")} placeholder="О компании для клиентов" /></Field>
          <Field label="Описание">
            <textarea className={inputCls} rows={2} value={form.description} onChange={f("description")} placeholder="Краткое описание…" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Категория"><input className={inputCls} value={form.category} onChange={f("category")} placeholder="Внешние" /></Field>
            <Field label="Аудитория">
              <select className={selectCls} value={form.audience} onChange={f("audience")}>
                <option value="external">Внешняя</option>
                <option value="internal">Внутренняя</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Кол-во слайдов"><input type="number" className={inputCls} value={form.slides_count} onChange={f("slides_count")} min={0} /></Field>
            <Field label="Размер файла"><input className={inputCls} value={form.file_size} onChange={f("file_size")} placeholder="14.2 МБ" /></Field>
          </div>
          <Field label="Автор"><input className={inputCls} value={form.author} onChange={f("author")} placeholder="Отдел маркетинга" /></Field>
          <Field label="Ссылка на файл (URL)"><input className={inputCls} value={form.file_url} onChange={f("file_url")} placeholder="https://…" /></Field>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_new} onChange={f("is_new")} className="w-4 h-4 accent-[hsl(var(--burgundy))]" />
            <span className="text-sm">Пометить как новинку</span>
          </label>
        </Modal>
      )}
    </div>
  );
}

function SettingsSection({ onLogout }: { onLogout: () => void }) {
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const changePass = async (e: React.FormEvent) => {
    e.preventDefault(); setMsg(""); setErr("");
    if (newPass.length < 4) { setErr("Пароль слишком короткий (минимум 4 символа)"); return; }
    if (newPass !== confirm) { setErr("Пароли не совпадают"); return; }
    try {
      await adminApi.changePassword(newPass);
      setMsg("Пароль успешно изменён"); setNewPass(""); setConfirm("");
    } catch (e: unknown) { setErr((e as Error).message); }
  };

  return (
    <div>
      <h2 className="font-cormorant text-xl font-semibold text-[hsl(var(--foreground))] mb-5">Настройки</h2>
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-border shadow-sm p-6">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
            <Icon name="Lock" size={15} className="text-[hsl(var(--burgundy))]" />
            Сменить пароль администратора
          </h3>
          <form onSubmit={changePass} className="space-y-3">
            <input type="password" className={inputCls} value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Новый пароль" />
            <input type="password" className={inputCls} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Повторите пароль" />
            {err && <p className="text-xs text-red-500">{err}</p>}
            {msg && <p className="text-xs text-green-600">{msg}</p>}
            <button type="submit" className="w-full bg-[hsl(var(--burgundy))] text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-90">
              Сохранить пароль
            </button>
          </form>
        </div>
        <div className="bg-white rounded-xl border border-border shadow-sm p-6">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
            <Icon name="LogOut" size={15} className="text-[hsl(var(--burgundy))]" />
            Выход
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">
            После выхода потребуется снова ввести пароль администратора.
          </p>
          <button onClick={onLogout} className="w-full border border-border text-sm py-2.5 rounded-lg hover:bg-[hsl(var(--beige))] transition-colors">
            Выйти из панели
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Главная панель ───────────────────────────────────────────────────────────
const navItems: { id: Section; label: string; icon: string }[] = [
  { id: "employees",     label: "Сотрудники",   icon: "Users" },
  { id: "news",          label: "Новости",       icon: "Newspaper" },
  { id: "documents",     label: "Документы",     icon: "FileText" },
  { id: "presentations", label: "Презентации",   icon: "Presentation" },
  { id: "settings",      label: "Настройки",     icon: "Settings" },
];

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