# finance_app/auth.py
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import User  # make sure you have a User model

class RoleBasedAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get('Authorization')
        if not token:
            return None  # let other auth classes handle it

        # here you’d decode token (e.g. JWT), this is just a placeholder
        if token != "Bearer secret123":
            raise AuthenticationFailed("Invalid token")

        return (None, None)  # return (user, auth)

def role_required(role):
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            user_role = getattr(request.user, "role", None)
            if user_role != role:
                raise AuthenticationFailed("You don’t have permission")
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator
