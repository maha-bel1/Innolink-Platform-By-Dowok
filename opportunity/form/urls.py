from django.urls import path
from . import views

urlpatterns = [
    path('', views.opportunity_form, name='opportunity_insert'), # get and post request for insert operation
    path('<int:id>/', views.opportunity_form, name='opportunity_update'),
    path('delete/<int:id>/', views.opportunity_delete, name='opportunity_delete'),
    path('list/',views.opportunity_list , name='opportunity_list' ),
]
