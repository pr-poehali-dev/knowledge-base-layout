import Icon from "@/components/ui/icon";

// ─── Типы ───────────────────────────────────────────────────────────────────
export interface Employee { id: number; name: string; role: string; dept: string; location: string; room: string; phone: string; email: string; initials: string; }
export interface NewsItem  { id: number; title: string; excerpt: string; category: string; is_published: boolean; published_at: string; }
export interface Document  { id: number; title: string; description: string; category: string; file_type: string; file_size: string; file_url: string; version: string; is_template: boolean; updated_at: string; }
export interface Presentation { id: number; title: string; description: string; category: string; audience: string; slides_count: number; file_size: string; file_url: string; author: string; is_new: boolean; updated_at: string; }

export type Section = "employees" | "news" | "documents" | "presentations" | "settings";

export const inputCls = "w-full px-3 py-2.5 rounded-lg border border-border bg-[hsl(var(--beige))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--burgundy))]/20 font-golos";
export const selectCls = inputCls;

// ─── Логин ───────────────────────────────────────────────────────────────────
import { useState } from "react";
import { adminApi } from "@/lib/adminApi";

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
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

// ─── Общие UI-компоненты ─────────────────────────────────────────────────────
export function SectionHeader({ title, onAdd, addLabel }: { title: string; onAdd: () => void; addLabel: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-cormorant text-xl font-semibold text-[hsl(var(--foreground))]">{title}</h2>
      <button onClick={onAdd} className="flex items-center gap-2 bg-[hsl(var(--burgundy))] text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
        <Icon name="Plus" size={15} /> {addLabel}
      </button>
    </div>
  );
}

export function Table({ cols, rows, onEdit, onDelete }: { cols: string[]; rows: (string | React.ReactNode)[][]; onEdit: (i: number) => void; onDelete: (i: number) => void }) {
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

export function Modal({ title, onClose, onSave, children }: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
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

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">{label}</label>{children}</div>;
}
