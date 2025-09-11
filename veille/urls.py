from django.urls import path
from .views import ItemsView, AlertRulesView, AlertRuleDetailView, AlertsView

urlpatterns = [
    path("items/", ItemsView.as_view()),
    path("rules/", AlertRulesView.as_view()),
    path("rules/<str:rule_id>/", AlertRuleDetailView.as_view()),
    path("alerts/", AlertsView.as_view()),
]
