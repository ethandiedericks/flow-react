import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../axios';
import logo from '../../assets/flow.png';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Flow" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: '', password: '', confirm_password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
            confirm_password: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required'),
          })}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            axiosInstance
              .post(`register/`, {
                email: values.email,
                password: values.password,
                confirm_password: values.confirm_password,
              })
              .then((res) => {
                navigate('/login');
              })
              .catch((error) => {
                if (error.response && error.response.data) {
                  setErrors(error.response.data);
                } else {
                  console.error('Error during registration:', error);
                }
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          <Form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:shadow-sm focus:outline-none"
                  placeholder="name@email.com"
                />
                <ErrorMessage name="email" component="p" className="mt-1 text-xs text-red-500" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:shadow-sm focus:outline-none"
                />
                <ErrorMessage name="password" component="p" className="mt-1 text-xs text-red-500" />
              </div>
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              <div className="mt-2">
                <Field
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  autoComplete="new-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:shadow-sm focus:outline-none"
                />
                <ErrorMessage name="confirm_password" component="p" className="mt-1 text-xs text-red-500" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign up
              </button>
            </div>
          </Form>
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member? <Link to="/login" className="font-semibold leading-6 text-green-600 hover:text-green-500">&nbsp;Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
