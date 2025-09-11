from django.conf import settings
from pymongo import MongoClient, ASCENDING, TEXT

_client = None

def get_client() -> MongoClient:
    global _client
    if _client is None:
        _client = MongoClient(settings.MONGODB_URI)
    return _client

def db():
    return get_client()[settings.MONGODB_DB]

# Collections
ITEMS = "items"            # documents monitorés (news, posts, tickets, logs…)
ALERT_RULES = "alert_rules"
ALERTS = "alerts"

def ensure_indexes():
    d = db()
    # Items: filtres et recherche plein-texte
    d[ITEMS].create_index([("published_at", ASCENDING)])
    d[ITEMS].create_index([("source", ASCENDING)])
    d[ITEMS].create_index([("severity", ASCENDING)])
    d[ITEMS].create_index([("tags", ASCENDING)])
    d[ITEMS].create_index([("title", TEXT), ("summary", TEXT), ("content", TEXT)], name="items_text")
    # Règles d'alerte
    d[ALERT_RULES].create_index([("active", ASCENDING)])
    # Alertes générées
    d[ALERTS].create_index([("created_at", ASCENDING)])
    d[ALERTS].create_index([("rule_id", ASCENDING)])
