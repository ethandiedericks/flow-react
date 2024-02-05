import React, { useState } from 'react';
import axiosInstance from '../../axios';
import ToastSuccess from './Toast';

const CreateTransactionForm = () => {
  const [successToast, setSuccessToast] = useState(false);
  const initialFormData = Object.freeze({
    transaction_type: 'income',
    transaction_name: '',
    transaction_amount: '',
    future_transaction_date: '',
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({}); // New state for validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Additional validation rules
    if (name === 'transaction_name' && /\d/.test(value)) {
      setErrors({ ...errors, [name]: 'Transaction Name cannot contain a number.' });
    } else if (name === 'transaction_amount' && (isNaN(value) || parseFloat(value) <= 0)) {
      setErrors({ ...errors, [name]: 'Transaction Amount must be a positive number.' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }

    updateFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const validationErrors = {};
    if (!formData.transaction_name) {
      validationErrors.transaction_name = 'Transaction Name is required.';
    } else if (/\d/.test(formData.transaction_name)) {
      validationErrors.transaction_name = 'Transaction Name cannot contain a number.';
    }

    if (!formData.transaction_amount) {
      validationErrors.transaction_amount = 'Transaction Amount is required.';
    } else if (isNaN(formData.transaction_amount) || parseFloat(formData.transaction_amount) <= 0) {
      validationErrors.transaction_amount = 'Transaction Amount must be a positive number.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Validation failed
      return;
    }

    const formattedDate = formData.future_transaction_date
      ? new Date(formData.future_transaction_date).toLocaleDateString('en-CA')
      : null;

    try {
      const response = await axiosInstance.post('transactions/', {
        transaction_type: formData.transaction_type,
        transaction_name: formData.transaction_name,
        transaction_amount: parseFloat(formData.transaction_amount),
        future_transaction_date: formattedDate,
      });

      console.log(response.data);
      setSuccessToast(true);
    } catch (error) {
      console.error('Error submitting transaction:', error);
      console.error('Error response data:', error.response.data);
      console.error('Error status:', error.response.status);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center">
        {successToast && <ToastSuccess message="Transaction added successfully!" />}
      </div>

      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new transaction</h2>
        <form onSubmit={handleSubmit}>
          {/* Transaction Type Select */}
          <div className="mb-4">
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-600">Transaction Type</label>
            <select id="transactionType" name="transaction_type" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:outline-none" onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="investment">Investment</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="transactionName" className="block text-sm font-medium text-gray-600">Transaction Name</label>
            <input
              type="text"
              id="transactionName"
              name="transaction_name"
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:outline-none ${errors.transaction_name && 'border-red-500'}`}
              placeholder="Name of transaction (eg. Food)"
              onChange={handleChange}
            />
            {errors.transaction_name && (
              <p className="text-red-500 text-sm mt-1">{errors.transaction_name}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col lg:flex-row lg:space-x-4">
            <div className="flex-1 mb-4 lg:mb-0">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-600">Amount</label>
              <input
                type="number"
                id="amount"
                name="transaction_amount"
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:outline-none ${errors.transaction_amount && 'border-red-500'}`}
                placeholder="R25000"
                onChange={handleChange}
              />
              {errors.transaction_amount && (
                <p className="text-red-500 text-sm mt-1">{errors.transaction_amount}</p>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="transactionDate" className="block text-sm font-medium text-gray-600">Future Transaction Date</label>
              <input
                type="date"
                id="transactionDate"
                name="future_transaction_date"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-green-500 focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateTransactionForm;
