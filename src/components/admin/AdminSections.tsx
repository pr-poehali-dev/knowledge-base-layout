import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/lib/adminApi";
import Icon from "@/components/ui/icon";
import {
  Employee, NewsItem, Document, Presentation,
  SectionHeader, Table, Modal, Field,
  inputCls, selectCls,
} from "./AdminShared";

// ─── Сотрудники ──────────────────────────────────────────────────────────────
export function EmployeesSection() {
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

// ─── Новости ─────────────────────────────────────────────────────────────────
export function NewsSection() {
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

// ─── Документы ───────────────────────────────────────────────────────────────
export function DocumentsSection() {
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

// ─── Презентации ─────────────────────────────────────────────────────────────
export function PresentationsSection() {
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

// ─── Настройки ───────────────────────────────────────────────────────────────
export function SettingsSection({ onLogout }: { onLogout: () => void }) {
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
