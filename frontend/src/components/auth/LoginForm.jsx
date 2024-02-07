import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../axios';
import logo from '../../assets/flow.png';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleGuestLogin = async () => {
    try {
      const response = await axiosInstance.post(`/token/`, {
        email: 'guest@gmail.com',
        password: 'Binary7j*',
      });
      const { access, refresh } = response.data;
  
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
  
      navigate('/budget');
    } catch (error) {
      console.error('Guest login error:', error);
    }
  };
  

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to='/'>
          <img className="mx-auto h-10 w-auto" src={logo} alt="Flow" />
        </Link>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            axiosInstance
              .post(`token/`, {
                email: values.email,
                password: values.password,
              })
              .then((res) => {
                const { access, refresh } = res.data;

                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);

                navigate('/budget');
              })
              .catch((error) => {
                if (error.response && error.response.status === 401) {
                  setErrors({ password: 'Invalid email or password' });
                } else {
                  console.error('Error during login:', error);
                }
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:shadow-sm focus:outline-none"
                    placeholder="name@email.com"
                    autoFocus
                  />
                  <ErrorMessage name="email" component="p" className="mt-1 text-xs text-red-500" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  <div className="text-sm">
                    <Link to="/password-reset" className="font-semibold text-green-600 hover:text-green-500">Forgot password?</Link>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:shadow-sm focus:outline-none"
                    placeholder="password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 py-1.5 text-sm text-gray-500 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span>{showPassword ? "Hide" : "Show"}</span>
                  </button>
                  <ErrorMessage name="password" component="p" className="mt-1 text-xs text-red-500" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Guest Login
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member? <span><Link to="/register" className="font-semibold leading-6 text-green-600 hover:text-green-500">&nbsp;Create an account</Link></span>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
