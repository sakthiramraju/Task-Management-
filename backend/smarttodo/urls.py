"""
Smart to do list - Django Backend Configuration

Designed & Developed by Sakthiram
© 2026 Sakthiram. All Rights Reserved.

Production-ready settings for Railway deployment with
JWT Authentication, MySQL (Production), SQLite (Development),
CORS configuration, and secure environment handling.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tasks.urls')),
]