import React from 'react';
import { Formik, Form, Field } from 'formik';
import axiosInstance from '../../axios';

const PasswordResetRequestPage = () => {
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await axiosInstance.post('/password/reset/', { email: values.email });
      setStatus('Password reset email sent. Check your inbox.');
    } catch (error) {
      setStatus('Unable to send password reset email.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Password Reset Request</h2>
        </div>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={handleSubmit}
        >
          {({ status, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <Field id="email" name="email" type="email" autoComplete="email" autoFocus required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Enter your email" />
                </div>
              </div>
              <div>
                <button type="submit" disabled={isSubmitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Send Reset Email
                </button>
              </div>
              {status && (
                <p className={`mt-2 text-center text-sm ${status.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>
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

export default PasswordResetRequestPage;
