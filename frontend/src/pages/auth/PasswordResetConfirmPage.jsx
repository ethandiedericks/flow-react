import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axiosInstance from '../../axios';

const PasswordResetConfirmPage = () => {
  const { token } = useParams();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await axiosInstance.post(`/password/reset/confirm/${token}/`, { password: values.password });
      setStatus('Password reset successful. You can now login with your new password.');
    } catch (error) {
      setStatus('Unable to reset password.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Password Reset</h2>
        </div>
        <Formik
          initialValues={{ password: '' }}
          onSubmit={handleSubmit}
        >
          {({ status, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <Field id="password" name="password" type="password" autoFocus autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Enter new password" />
                </div>
              </div>
              <div>
                <button type="submit" disabled={isSubmitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Reset Password
                </button>
              </div>
              {status && (
                <p className={`mt-2 text-center text-sm ${status.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                  {status}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordResetConfirmPage;
