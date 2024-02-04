import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/flow.png';

const RegistrationForm = () => {

  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    email: '',
    password: '',
    confirm_password:''
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
      .post(`register/`, {
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
      })
      .then((res) => {
        navigate('/login');
      });
  };
  

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Flow" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an your account</h2>
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
            autoComplete="email"
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
            </div>
            <div className="mt-2">
            <input
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:outline-none"
            required
            onChange={handleChange}
            />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
            </div>
            <div className="mt-2">
            <input
            type="password"
            id="confirmPassword"
            name="confirm_password"
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
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <Link to="/login" className="font-semibold leading-6 text-green-600 hover:text-green-500">
            &nbsp;Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegistrationForm