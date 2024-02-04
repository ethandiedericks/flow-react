import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import logo from '../../assets/flow.png';
  
const LoginForm = () => {
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // trim whitespace if any
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        const { access, refresh } = res.data;

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        navigate('/budget');
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
    };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Flow" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
            <input
            type="email"
            id="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:outline-none"
            placeholder="name@email.com"
            required
            onChange={handleChange}
            />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="text-sm">
                <Link to={"/forgot_password"} className="font-semibold text-green-600 hover:text-green-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
            <input
            type="password"
            id="password"
            name="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:outline-none"
            required
            onChange={handleChange}
            />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link to="/register" className="font-semibold leading-6 text-green-600 hover:text-green-500">
            &nbsp;Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm