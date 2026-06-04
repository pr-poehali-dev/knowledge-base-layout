import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p22472582_knowledge_base_layou")
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def ok(data):
    return {"statusCode": 200, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data, default=str)}

def handler(event: dict, context) -> dict:
    """Публичный API только для чтения: сотрудники, новости, документы, презентации."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    qs = event.get("queryStringParameters") or {}
    resource = qs.get("resource", "")

    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:

            if resource == "employees":
                location = qs.get("location")
                if location:
                    cur.execute(f'SELECT * FROM "{SCHEMA}".employees WHERE is_active=TRUE AND location=%s ORDER BY sort_order, name', (location,))
                else:
                    cur.execute(f'SELECT * FROM "{SCHEMA}".employees WHERE is_active=TRUE ORDER BY location, sort_order, name')
                return ok(list(cur.fetchall()))

            if resource == "news":
                cur.execute(f'SELECT * FROM "{SCHEMA}".news WHERE is_published=TRUE ORDER BY published_at DESC LIMIT 20')
                return ok(list(cur.fetchall()))

            if resource == "documents":
                cur.execute(f'SELECT * FROM "{SCHEMA}".documents WHERE is_active=TRUE ORDER BY category, title')
                return ok(list(cur.fetchall()))

            if resource == "presentations":
                cur.execute(f'SELECT * FROM "{SCHEMA}".presentations WHERE is_active=TRUE ORDER BY updated_at DESC')
                return ok(list(cur.fetchall()))

    return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Not found"})}
