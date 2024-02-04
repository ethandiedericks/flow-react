from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.db.models import Sum
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode


from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Transaction
from users.serializers import UserSerializer
from .serializers import (
    PasswordResetSerializer,
    TransactionSerializer,
)


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(password=request.data["password"], is_active=True)

        # Create a refresh token for the new user
        refresh = RefreshToken.for_user(user)

        response_data = {
            "user": serializer.data,
            "refresh_token": str(refresh),
            "access_token": str(refresh.access_token),
        }

        print(f"User {user.email} registered successfully.")
        print(f"Refresh Token: {refresh}")
        print(f"Access Token: {refresh.access_token}")

        return Response(response_data, status=status.HTTP_201_CREATED)


class BlacklistTokenView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"message": "Token successfully blacklisted."},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class PasswordResetView(APIView):
    def post(self, request, *args, **kwargs):
        User = get_user_model()
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        uid = urlsafe_base64_encode(force_bytes(user.pk))

        token = default_token_generator.make_token(user)

        reset_link = f"http://localhost:3000/reset-password/{uid}/{token}/"

        send_mail(
            "Password Reset",
            f"Click the following link to reset your password: {reset_link}",
            "from@example.com",
            [email],
            fail_silently=False,
        )

        return Response(
            {"message": "Password reset email sent. Check your email for instructions."}
        )


class TransactionListCreateView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)


class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)


class TransactionUpdateView(generics.UpdateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class TransactionDeleteView(generics.DestroyAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()
        return Response({"message": "Transaction deleted successfully."})


class BudgetSummaryView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        user = self.request.user
        transactions = Transaction.objects.filter(user=user)

        income_total = (
            transactions.filter(transaction_type="income").aggregate(
                Sum("transaction_amount")
            )["transaction_amount__sum"]
            or 0
        )
        expense_total = (
            transactions.filter(transaction_type="expense").aggregate(
                Sum("transaction_amount")
            )["transaction_amount__sum"]
            or 0
        )
        investment_total = (
            transactions.filter(transaction_type="investment").aggregate(
                Sum("transaction_amount")
            )["transaction_amount__sum"]
            or 0
        )

        # Fetching dynamic table data from the database
        table_data = list(
            transactions.values(
                "id",
                "transaction_type",
                "transaction_name",
                "transaction_amount",
                "future_transaction_date",
            )
        )

        data = {
            "income_total": income_total,
            "expense_total": expense_total,
            "investment_total": investment_total,
            "table_data": table_data,
        }

        return Response(data)
