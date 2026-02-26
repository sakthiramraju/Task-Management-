from rest_framework import viewsets, generics, permissions, status, filters
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Task
from .serializers import TaskSerializer, UserSerializer, RegisterSerializer
from .permissions import IsOwner
from rest_framework_simplejwt.tokens import RefreshToken

# Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# User Profile
class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self):
        return self.request.user

# Task CRUD
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'priority']
    ordering_fields = ['due_date', 'priority', 'created_at']

    def get_queryset(self):
        qs = Task.objects.filter(user=self.request.user)
        status_param = self.request.query_params.get('status')
        priority_param = self.request.query_params.get('priority')
        if status_param == "completed":
            qs = qs.filter(is_completed=True)
        if status_param == "pending":
            qs = qs.filter(is_completed=False)
        if priority_param:
            qs = qs.filter(priority__iexact=priority_param)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Logout (JWT Blacklist style)
from rest_framework.views import APIView
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)