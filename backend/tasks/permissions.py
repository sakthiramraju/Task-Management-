"""
Smart to do list - Django Backend Configuration

Designed & Developed by Sakthiram
© 2026 Sakthiram. All Rights Reserved.

Production-ready settings for Railway deployment with
JWT Authentication, MySQL (Production), SQLite (Development),
CORS configuration, and secure environment handling.
"""

from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user