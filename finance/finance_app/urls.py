from django.urls import path
from . import views

urlpatterns = [
    path('', views.finance_home, name='finance-home'),                 # Redirect to list
    path('financings/', views.financing_list, name='financing-list'),  # List all financings
    path('financings/add/', views.financing_form, name='financing-create'),  # Add new financing
    path('financings/<int:pk>/', views.financing_detail, name='financing-detail'),  # View details
    path('financings/<int:pk>/edit/', views.financing_form, name='financing-update'),  # Edit financing
    path('financings/<int:financing_id>/apply/', views.application_form, name='application-create'),  # Apply
]
