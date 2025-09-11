from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bson import ObjectId

from .serializers import ItemFilterSerializer, AlertRuleSerializer
from .services.mongo import db, ITEMS, ALERT_RULES, ALERTS
from .services.alerts import build_items_query, fetch_items

class ItemsView(APIView):
    """GET /api/veille/items/ + filtres via query string"""
    def get(self, request):
        s = ItemFilterSerializer(data=request.query_params)
        s.is_valid(raise_exception=True)
        query = build_items_query(s.validated_data)
        sort = s.validated_data.get("sort", "-published_at")
        items = fetch_items(query, sort=sort, limit=200)
        for i in items:
            i["_id"] = str(i["_id"])
        return Response({"items": items})

class AlertRulesView(APIView):
    """GET/POST des règles d’alerte"""
    def get(self, request):
        rules = list(db()[ALERT_RULES].find())
        for r in rules:
            r["_id"] = str(r["_id"])
        return Response({"rules": rules})

    def post(self, request):
        s = AlertRuleSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        doc = s.validated_data
        inserted = db()[ALERT_RULES].insert_one(doc)
        doc["_id"] = str(inserted.inserted_id)
        return Response(doc, status=status.HTTP_201_CREATED)

class AlertRuleDetailView(APIView):
    """GET/PATCH/DELETE une règle"""
    def get(self, request, rule_id: str):
        rule = db()[ALERT_RULES].find_one({"_id": ObjectId(rule_id)})
        if not rule:
            return Response(status=404)
        rule["_id"] = str(rule["_id"])
        return Response(rule)

    def patch(self, request, rule_id: str):
        s = AlertRuleSerializer(data=request.data, partial=True)
        s.is_valid(raise_exception=True)
        db()[ALERT_RULES].update_one({"_id": ObjectId(rule_id)}, {"$set": s.validated_data})
        rule = db()[ALERT_RULES].find_one({"_id": ObjectId(rule_id)})
        rule["_id"] = str(rule["_id"])
        return Response(rule)

    def delete(self, request, rule_id: str):
        db()[ALERT_RULES].delete_one({"_id": ObjectId(rule_id)})
        return Response(status=204)

class AlertsView(APIView):
    """GET /api/veille/alerts/ : liste des alertes générées"""
    def get(self, request):
        alerts = list(db()[ALERTS].find().sort([("created_at", -1)]).limit(200))
        for a in alerts:
            a["_id"] = str(a["_id"])
        return Response({"alerts": alerts})
