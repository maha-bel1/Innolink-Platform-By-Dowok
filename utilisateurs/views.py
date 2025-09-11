# utilisateurs/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class RegisterView(APIView):
    def post(self, request):
        # Example: handle user registration
        username = request.data.get("username")
        password = request.data.get("password")
        # Here you would create the user (simplified example)
        if username and password:
            return Response({"message": f"User {username} registered!"}, status=status.HTTP_201_CREATED)
        return Response({"error": "Missing username or password"}, status=status.HTTP_400_BAD_REQUEST)
