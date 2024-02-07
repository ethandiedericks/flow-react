from django.test import TestCase
from django.core import mail
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()


class PasswordResetEmailTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_password_reset_email_sent(self):
        # Create a user
        user = User.objects.create_user(
            email="test@example.com", password="testpassword"
        )

        # Send password reset request
        reset_url = reverse("password_reset_request")
        data = {"email": "test@example.com"}
        response = self.client.post(reset_url, data)

        # Check that the password reset email was sent
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, "Password Reset Request")
        self.assertIn(
            "Click the following link to reset your password:", mail.outbox[0].body
        )

    def test_invalid_email_no_email_sent(self):
        # Send password reset request with invalid email
        reset_url = reverse("password_reset_request")
        data = {"email": "invalidemail@example.com"}
        response = self.client.post(reset_url, data)

        # Check that no password reset email was sent
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(mail.outbox), 0)
