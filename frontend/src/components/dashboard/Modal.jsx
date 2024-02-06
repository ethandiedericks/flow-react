import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../../axios';

const Modal = ({ isOpen, onClose, rowData, onUpdateRow }) => {
  const [updatedData, setUpdatedData] = useState({
    transaction_type: '',
    transaction_name: '',
    transaction_amount: 0,
    future_transaction_date: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Update state when rowData changes
    setUpdatedData(rowData ? { ...rowData } : {
      transaction_type: '',
      transaction_name: '',
      transaction_amount: 0,
      future_transaction_date: null,
    });
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // If the input is a number, parse the value as a float
    const updatedValue = type === 'number' ? parseFloat(value) : value;

    // Special handling for future_transaction_date
    if (name === 'future_transaction_date') {
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value || null,  // Set to null if the value is an empty string
      }));
    } else {
      // Set a default value if the updatedValue is null
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: updatedValue !== null ? updatedValue : '',
      }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!updatedData.transaction_name || /\d/.test(updatedData.transaction_name)) {
      validationErrors.transaction_name = 'Transaction Name is required and cannot contain a number.';
    }

    if (!updatedData.transaction_amount || isNaN(updatedData.transaction_amount) || parseFloat(updatedData.transaction_amount) <= 0) {
      validationErrors.transaction_amount = 'Transaction Amount is required and must be a positive number.';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0; // Return true if there are no validation errors
  };

  const updateTransaction = async () => {
    try {
      if (!validateForm()) {
        // Validation failed
        return;
      }

      // Destructure the necessary properties from formData
      const { transaction_type, transaction_name, transaction_amount, future_transaction_date } = updatedData;

      // Format date if it exists
      const formattedDate = future_transaction_date
        ? new Date(future_transaction_date).toLocaleDateString('en-CA')
        : null;

      const response = await axiosInstance.put(`transactions/${rowData.id}/update/`, {
        transaction_type,
        transaction_name,
        transaction_amount: parseFloat(transaction_amount),
        future_transaction_date: formattedDate,
      });

      // Close the modal or perform any other actions
      onClose();
      // Trigger any additional update actions if needed
      onUpdateRow(updatedData);

    } catch (error) {
      console.error('Error updating transaction:', error);
      console.error('Error response data:', error.response.data);
      console.error('Error status:', error.response.status);

      // Handle errors here
    }
  };

  const deleteTransaction = async () => {
    try {
      await axiosInstance.delete(`transactions/${rowData.id}/delete/`);

      // Close the modal or perform any other actions
      onClose();
      // Trigger any additional update actions if needed
      onUpdateRow(null); // Pass null to indicate that the row has been deleted

    } catch (error) {
      console.error('Error deleting transaction:', error);
      console.error('Error response data:', error.response.data);
      console.error('Error status:', error.response.status);

      // Handle errors here
    }
  };

  const handleUpdateRow = async () => {
    // Call the updateTransaction function
    await updateTransaction();

    // After the updateTransaction is successful, update the table row
    onUpdateRow(updatedData);
    setTableData(prevData => prevData.filter(row => row.id !== rowData.id));
  };

  if (!isOpen || !rowData) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-40 ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative bg-white rounded-lg shadow dark:bg-white w-full max-w-md max-h-full mx-auto my-6 ">

          {/* Modal Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900">{rowData.transaction_name}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="relative p-6 flex-auto">
            <form>
              {/* Transaction Type Select */}
              <div className="mb-4">
                <label htmlFor="transactionType" className="block text-sm font-medium text-gray-600">Transaction Type</label>
                <select
                  id="transactionType"
                  name="transaction_type"
                  value={updatedData.transaction_type}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleInputChange}
                  autoFocus
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="investment">Investment</option>
                </select>
              </div>

              {/* Transaction Name Input */}
              <div className="mb-4">
                <label htmlFor="transactionName" className="block text-sm font-medium text-gray-600">Transaction Name</label>
                <input
                  type="text" id="transactionName"
                  name="transaction_name"
                  value={updatedData.transaction_name}
                  className={`w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.transaction_name && 'border-red-500'}`}
                  placeholder="Name of transaction (eg. Food)"
                  onChange={handleInputChange}
                />
                {errors.transaction_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.transaction_name}</p>
                )}
              </div>

              {/* Amount and Transaction Date Container */}
              <div className="mb-4 flex flex-col lg:flex-row lg:space-x-4">
                {/* Amount Input */}
                <div className="flex-1 mb-4 lg:mb-0">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-600">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    name="transaction_amount"
                    value={updatedData.transaction_amount}
                    className={`w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.transaction_name && 'border-red-500'}`}
                    placeholder="R25000"
                    onChange={handleInputChange}
                  />
                  {errors.transaction_amount && (
                    <p className="text-red-500 text-sm mt-1">{errors.transaction_amount}</p>
                  )}
                </div>

                {/* Future Transaction Date Select */}
                <div className="flex-1">
                  <label htmlFor="transactionDate" className="block text-sm font-medium text-gray-600">Transaction Date</label>
                  <input
                    type="date"
                    id="transactionDate"
                    name="future_transaction_date"
                    value={updatedData.future_transaction_date ? updatedData.future_transaction_date.split('T')[0] : ''}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              type="button"
              onClick={deleteTransaction} 
            >
              Delete
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="button"
              onClick={handleUpdateRow}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  rowData: PropTypes.shape({
    transaction_type: PropTypes.string.isRequired,
    transaction_name: PropTypes.string.isRequired,
    transaction_amount: PropTypes.number.isRequired,
    future_transaction_date: PropTypes.string,
  }),
  onUpdateRow: PropTypes.func.isRequired,
};

export default Modal;
