# api/urls.py

from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import (
    UserRegistrationView,
    BlacklistTokenView,
    TransactionListCreateView,
    TransactionDetailView,
    BudgetSummaryView,
    TransactionDeleteView,
    TransactionUpdateView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
)

urlpatterns = [
    # Token endpoints for JWT authentication
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/blacklist/", BlacklistTokenView.as_view(), name="token_blacklist"),
    # User registration endpoint
    path("register/", UserRegistrationView.as_view(), name="user-registration"),
    # Password reset endpoints
    path(
        "password/reset/",
        PasswordResetRequestView.as_view(),
        name="password_reset_request",
    ),
    path(
        "password/reset/confirm/<str:token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    # Transaction endpoints
    path(
        "transactions/",
        TransactionListCreateView.as_view(),
        name="transaction-list-create",
    ),
    path(
        "transactions/<uuid:pk>/",
        TransactionDetailView.as_view(),
        name="transaction-detail",
    ),
    path(
        "transactions/<uuid:pk>/delete/",
        TransactionDeleteView.as_view(),
        name="transaction-delete",
    ),
    path(
        "transactions/<uuid:pk>/update/",
        TransactionUpdateView.as_view(),
        name="transaction-update",
    ),
    path("budget-summary/", BudgetSummaryView.as_view(), name="budget-summary"),
]
