from django.contrib import admin
from django.urls import path, include
from .views import home  # make sure this exists

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home),  # ← this is your home page
    path("api/users/", include("utilisateurs.urls")),  # your users API
]