from rest_framework import serializers

from .models import Transaction


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            "transaction_type",
            "transaction_name",
            "transaction_amount",
            "future_transaction_date",
        ]
        extra_kwargs = {
            "future_transaction_date": {"required": False, "allow_null": True},
        }
