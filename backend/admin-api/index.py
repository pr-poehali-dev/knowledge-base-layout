import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p22472582_knowledge_base_layou")
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def ok(data, status=200):
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data, default=str)}

def err(msg, status=400):
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps({"error": msg})}

def check_admin(event):
    """Проверяет токен администратора из заголовка."""
    token = (event.get("headers") or {}).get("X-Admin-Token", "")
    if not token:
        return False
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(f'SELECT value FROM "{SCHEMA}".settings WHERE key = %s', ("admin_password",))
            row = cur.fetchone()
            return row and token == row[0]

def handler(event: dict, context) -> dict:
    """Единый API для админ-панели: сотрудники, новости, документы, презентации."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    qs = event.get("queryStringParameters") or {}
    # Роутинг через query-параметр ?resource=employees&id=5
    resource = qs.get("resource", "")
    res_id = qs.get("id", "")
    if res_id:
        path = f"/{resource}/{res_id}"
    elif resource:
        path = f"/{resource}"
    else:
        path = event.get("path", "/").rstrip("/") or "/"

    # --- Авторизация администратора ---
    if path == "/auth" and method == "POST":
        body = json.loads(event.get("body") or "{}")
        password = body.get("password", "")
        with get_conn() as conn:
            with conn.cursor() as cur:
                cur.execute(f'SELECT value FROM "{SCHEMA}".settings WHERE key = %s', ("admin_password",))
                row = cur.fetchone()
                if row and password == row[0]:
                    return ok({"ok": True, "token": password})
                return ok({"ok": False, "error": "Неверный пароль"}, 401)

    # --- Смена пароля администратора ---
    if path == "/auth/change-password" and method == "POST":
        if not check_admin(event):
            return err("Нет доступа", 403)
        body = json.loads(event.get("body") or "{}")
        new_pass = body.get("new_password", "").strip()
        if len(new_pass) < 4:
            return err("Пароль слишком короткий")
        with get_conn() as conn:
            with conn.cursor() as cur:
                cur.execute(f'UPDATE "{SCHEMA}".settings SET value = %s, updated_at = NOW() WHERE key = %s', (new_pass, "admin_password"))
            conn.commit()
        return ok({"ok": True})

    # --- Проверяем токен для остальных маршрутов ---
    if not check_admin(event):
        return err("Нет доступа", 403)

    # ==============================
    # СОТРУДНИКИ
    # ==============================
    if path == "/employees":
        with get_conn() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if method == "GET":
                    loc = qs.get("location")
                    if loc:
                        cur.execute(f'SELECT * FROM "{SCHEMA}".employees WHERE is_active = TRUE AND location = %s ORDER BY sort_order, name', (loc,))
                    else:
                        cur.execute(f'SELECT * FROM "{SCHEMA}".employees WHERE is_active = TRUE ORDER BY location, sort_order, name')
                    return ok(list(cur.fetchall()))
                if method == "POST":
                    b = json.loads(event.get("body") or "{}")
                    cur.execute(
                        f'INSERT INTO "{SCHEMA}".employees (name, role, dept, location, room, phone, email, initials, sort_order) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *',
                        (b["name"], b["role"], b["dept"], b["location"], b.get("room",""), b.get("phone",""), b.get("email",""), b.get("initials",""), b.get("sort_order",0))
                    )
                    conn.commit()
                    return ok(dict(cur.fetchone()), 201)

    if path.startswith("/employees/"):
        emp_id = path.split("/")[-1]
        with get_conn() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if method == "PUT":
                    b = json.loads(event.get("body") or "{}")
                    cur.execute(
                        f'UPDATE "{SCHEMA}".employees SET name=%s, role=%s, dept=%s, location=%s, room=%s, phone=%s, email=%s, initials=%s, sort_order=%s, updated_at=NOW() WHERE id=%s RETURNING *',
                        (b["name"], b["role"], b["dept"], b["location"], b.get("room",""), b.get("phone",""), b.get("email",""), b.get("initials",""), b.get("sort_order",0), emp_id)
                    )
                    conn.commit()
                    row = cur.fetchone()
                    return ok(dict(row)) if row else err("Не найдено", 404)
                if method == "DELETE":
                    cur.execute(f'UPDATE "{SCHEMA}".employees SET is_active=FALSE, updated_at=NOW() WHERE id=%s', (emp_id,))
                    conn.commit()
                    return ok({"ok": True})

    # ==============================
    # НОВОСТИ
    # ==============================
    if path == "/news":
        with get_conn() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if method == "GET":
                    all_news = qs.get("all") == "1"
                    if all_news:
                        cur.execute(f'SELECT * FROM "{SCHEMA}".news ORDER BY published_at DESC')
                    else:
                        cur.execute(f'SELECT * FROM "{SCHEMA}".news WHERE is_published = TRUE ORDER BY published_at DESC LIMIT 20')
                    return ok(list(cur.fetchall()))
                if method == "POST":
                    b = json.loads(event.get("body") or "{}")
                    cur.execute(
                        f'INSERT INTO "{SCHEMA}".news (title, excerpt, body, category, is_published, published_at) VALUES (%s,%s,%s,%s,%s,NOW()) RETURNING *',
                        (b["title"], b.get("excerpt",""), b.get("body",""), b.get("category","Общее"), b.get("is_published", True))
                    )
                    conn.commit()
                    return ok(dict(cur.fetchone()), 201)

    if path.startswith("/news/"):
        news_id = path.split("/")[-1]
        with get_conn() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if method == "PUT":
                    b = json.loads(event.get("body") or "{}")
                    cur.execute(
                        f'UPDATE "{SCHEMA}".news SET title=%s, excerpt=%s, body=%s, category=%s, is_published=%s, updated_at=NOW() WHERE id=%s RETURNING *',
                        (b["title"], b.get("excerpt",""), b.get("body",""), b.get("category","Общее"), b.get("is_published", True), news_id)
                    )
                    conn.commit()
                    row = cur.fetchone()
                    return ok(dict(row)) if row else err("Не найдено", 404)
                if method == "DELETE":
                    cur.execute(f'DELETE FROM "{SCHEMA}".news WHERE id=%s', (news_id,))
                    conn.commit()
                    return ok({"ok": True})

    # ==============================
    # ДОКУМЕНТЫ
    # ==============================
    if path == "/documents":
        with get_conn() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if method == "GET":
                    cur.execute(f'SELECT * FROM "{SCHEMA}".documents WHERE is_active=TRUE ORDER BY category, title')
                    return ok(list(cur.fetchall()))
                if method == "POST":
                    b = json.loads(event.get("body") or "{}")
                    cur.execute(
                        f'INSERT INTO "{SCHEMA}".documents (title, description, category, file_type, file_size, file_url, version, is_template) VALUES (%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *',
                        (b["title"], b.get("description",""), b["category"], b.get("file_type","PDF"), b.get("file_size",""), b.get("file_url",""), b.get("version","1.0"), b.get("is_template", False))
                    )
                    conn.commit()
                    return ok(dict(cur.fetchone()), 201)

    if path.startswith("/documents/"):
        doc_id = path.split("/")[-1]
        with get_conn() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if method == "PUT":
                    b = json.loads(event.get("body") or "{}")
                    cur.execute(
                        f'UPDATE "{SCHEMA}".documents SET title=%s, description=%s, category=%s, file_type=%s, file_size=%s, file_url=%s, version=%s, is_template=%s, updated_at=NOW() WHERE id=%s RETURNING *',
                        (b["title"], b.get("description",""), b["category"], b.get("file_type","PDF"), b.get("file_size",""), b.get("file_url",""), b.get("version","1.0"), b.get("is_template", False), doc_id)
                    )
                    conn.commit()
                    row = cur.fetchone()
                    return ok(dict(row)) if row else err("Не найдено", 404)
                if method == "DELETE":
                    cur.execute(f'UPDATE "{SCHEMA}".documents SET is_active=FALSE, updated_at=NOW() WHERE id=%s', (doc_id,))
                    conn.commit()
                    return ok({"ok": True})

    # ==============================
    # ПРЕЗЕНТАЦИИ
    # ==============================
    if path == "/presentations":
        with get_conn() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if method == "GET":
                    cur.execute(f'SELECT * FROM "{SCHEMA}".presentations WHERE is_active=TRUE ORDER BY updated_at DESC')
                    return ok(list(cur.fetchall()))
                if method == "POST":
                    b = json.loads(event.get("body") or "{}")
                    cur.execute(
                        f'INSERT INTO "{SCHEMA}".presentations (title, description, category, audience, slides_count, file_size, file_url, author, is_new) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *',
                        (b["title"], b.get("description",""), b["category"], b.get("audience","internal"), b.get("slides_count",0), b.get("file_size",""), b.get("file_url",""), b.get("author",""), b.get("is_new", False))
                    )
                    conn.commit()
                    return ok(dict(cur.fetchone()), 201)

    if path.startswith("/presentations/"):
        pres_id = path.split("/")[-1]
        with get_conn() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if method == "PUT":
                    b = json.loads(event.get("body") or "{}")
                    cur.execute(
                        f'UPDATE "{SCHEMA}".presentations SET title=%s, description=%s, category=%s, audience=%s, slides_count=%s, file_size=%s, file_url=%s, author=%s, is_new=%s, updated_at=NOW() WHERE id=%s RETURNING *',
                        (b["title"], b.get("description",""), b["category"], b.get("audience","internal"), b.get("slides_count",0), b.get("file_size",""), b.get("file_url",""), b.get("author",""), b.get("is_new", False), pres_id)
                    )
                    conn.commit()
                    row = cur.fetchone()
                    return ok(dict(row)) if row else err("Не найдено", 404)
                if method == "DELETE":
                    cur.execute(f'UPDATE "{SCHEMA}".presentations SET is_active=FALSE, updated_at=NOW() WHERE id=%s', (pres_id,))
                    conn.commit()
                    return ok({"ok": True})

    return err("Маршрут не найден", 404)