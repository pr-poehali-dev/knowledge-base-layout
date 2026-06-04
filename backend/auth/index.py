import os
import json
import hmac
import hashlib
import time

SECRET_TOKEN_KEY = "kb_session_v1"

def make_token() -> str:
    """Генерирует сессионный токен на основе пароля и времени (сутки)."""
    day = str(int(time.time()) // 86400)
    raw = f"{SECRET_TOKEN_KEY}:{os.environ.get('KB_PASSWORD', '')}:{day}"
    return hmac.new(b"kb", raw.encode(), hashlib.sha256).hexdigest()

def handler(event: dict, context) -> dict:
    """Авторизация по единому паролю компании. Возвращает сессионный токен."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    if event.get("httpMethod") == "GET":
        # Проверка токена
        token = (event.get("queryStringParameters") or {}).get("token", "")
        valid = token == make_token()
        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"valid": valid}),
        }

    # POST — вход по паролю
    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        body = {}

    password = body.get("password", "")
    expected = os.environ.get("KB_PASSWORD", "")

    if not expected:
        return {"statusCode": 500, "headers": cors, "body": json.dumps({"error": "Пароль не настроен"})}

    if password == expected:
        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"ok": True, "token": make_token()}),
        }

    return {
        "statusCode": 401,
        "headers": cors,
        "body": json.dumps({"ok": False, "error": "Неверный пароль"}),
    }
