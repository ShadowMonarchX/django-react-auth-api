from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        try:
            access_token = request.headers.get("Authorization").split(" ")[1]
            AccessToken(access_token)  
        except (IndexError, TokenError):
            raise PermissionDenied("Invalid or expired token. Please log in again.")
        
        return obj == request.user
