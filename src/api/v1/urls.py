from django.urls import path

from . import views

app_name = "api"

urlpatterns = [path("simulate/", views.Simulate.as_view(), name="api")]
