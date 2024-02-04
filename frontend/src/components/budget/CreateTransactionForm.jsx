import React, { useState } from 'react';
import axiosInstance from '../../axios'; 

const CreateTransactionForm = () => {

  const initialFormData = Object.freeze({
    transaction_type: 'income',
    transaction_name: '',
    transaction_amount:'',
    future_transaction_date:'',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // trim whitespace if any
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.transaction_name || !formData.transaction_amount ) {
      console.error('Required fields are missing.');
      // You can display an error message to the user if needed.
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
      // Handle the response as needed

      // You can redirect or perform other actions after a successful submission
    } catch (error) {
      console.error('Error submitting transaction:', error);
      console.error('Error response data:', error.response.data);
      console.error('Error status:', error.response.status);

      // Handle errors here
    }
  };
  

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new transaction</h2>
        <form>

          {/* Transaction Type Select */}
          <div className="mb-4">
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-600">Transaction Type</label>
            <select id="transactionType" name="transaction_type" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="investment">Investment</option>
            </select>
          </div>

          {/* Transaction Name Input */}
          <div className="mb-4">
            <label htmlFor="transactionName" className="block text-sm font-medium text-gray-600">Transaction Name</label>
            <input type="text" id="transactionName" name="transaction_name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name of transaction (eg. Food)" onChange={handleChange}/>
          </div>

          {/* Amount and Transaction Date Container */}
          <div className="mb-4 flex flex-col lg:flex-row lg:space-x-4">
            {/* Amount Input */}
            <div className="flex-1 mb-4 lg:mb-0">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-600">Amount</label>
              <input type="number" id="amount" name="transaction_amount" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='R25000' onChange={handleChange}/>
            </div>

            {/* Future Transaction Date Select */}
            <div className="flex-1">
              <label htmlFor="transactionDate" className="block text-sm font-medium text-gray-600">Future Transaction Date</label>
              <input type="date" id="transactionDate" name="future_transaction_date" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>
        </div>

        </form>
      </div>
    </section>
  );
}

export default CreateTransactionForm;
