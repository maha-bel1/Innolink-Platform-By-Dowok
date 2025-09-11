from datetime import datetime, timedelta, timezone
from typing import Dict, Any, List
from pymongo import DESCENDING
from django.core.mail import send_mail
from django.conf import settings
import requests

from .mongo import db, ITEMS, ALERT_RULES, ALERTS

def build_items_query(filters: Dict[str, Any]) -> Dict[str, Any]:
    q: Dict[str, Any] = {}
    if filters.get("q"):
        q["$text"] = {"$search": filters["q"]}
    if filters.get("source"):
        q["source"] = {"$in": filters["source"]}
    if filters.get("tags"):
        q["tags"] = {"$in": filters["tags"]}
    if filters.get("severity"):
        q["severity"] = {"$in": filters["severity"]}

    # fenêtre glissante pour les règles OU plage explicite pour l’API
    if "date_window_hours" in filters:
        now = datetime.now(timezone.utc)
        q["published_at"] = {"$gte": now - timedelta(hours=int(filters["date_window_hours"]))}
    else:
        rng = {}
        if filters.get("date_from"):
            rng["$gte"] = filters["date_from"]
        if filters.get("date_to"):
            rng["$lte"] = filters["date_to"]
        if rng:
            q["published_at"] = rng
    return q

def fetch_items(query: Dict[str, Any], sort: str = "-published_at", limit: int = 200) -> List[Dict[str, Any]]:
    sort_dir = DESCENDING if sort.startswith("-") else 1
    cur = db()[ITEMS].find(query).sort([("published_at", sort_dir)]).limit(limit)
    return list(cur)

def _deliver_email(subject: str, body: str, to: List[str]) -> None:
    if not to:
        return
    send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, to, fail_silently=False)

def _deliver_webhook(url: str, payload: Dict[str, Any]) -> None:
    if not url:
        return
    try:
        requests.post(url, json=payload, timeout=10)
    except Exception:
        pass

def run_rule(rule: Dict[str, Any]) -> int:
    query = build_items_query(rule)
    items = fetch_items(query, sort="-published_at", limit=50)
    if not items:
        return 0

    alert_doc = {
        "rule_id": str(rule.get("_id")),
        "rule_name": rule.get("name"),
        "matched_count": len(items),
        "items": [{
            "_id": str(i.get("_id")),
            "title": i.get("title"),
            "url": i.get("url"),
            "source": i.get("source"),
            "severity": i.get("severity"),
            "published_at": i.get("published_at"),
        } for i in items],
        "created_at": datetime.now(timezone.utc),
    }
    db()[ALERTS].insert_one(alert_doc)

    # email
    lines = [f"- {x['title']} ({x.get('source')}) {x.get('url') or ''}" for x in alert_doc["items"]]
    subject = f"[Veille] {rule.get('name')} — {len(items)} élément(s)"
    body = "\n".join(lines)
    _deliver_email(subject, body, rule.get("emails", []))

    # webhook
    _deliver_webhook(rule.get("webhook_url"), alert_doc)

    return len(items)

def run_all_active_rules() -> int:
    total = 0
    for rule in db()[ALERT_RULES].find({"active": True}):
        total += run_rule(rule)
    return total
