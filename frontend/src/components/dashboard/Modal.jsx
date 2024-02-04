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
  const updateTransaction = async () => {
    try {
      // Destructure the necessary properties from formData
      const { transaction_type, transaction_name, transaction_amount, future_transaction_date } = updatedData;
  
      // Check for required fields
      if (!transaction_name || !transaction_amount) {
        console.error('Required fields are missing.');
        // You can display an error message to the user if needed.
        return;
      }
  
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
  

  const handleUpdateRow = async () => {
    // Call the updateTransaction function
    await updateTransaction();
  
    // After the updateTransaction is successful, update the table row
    onUpdateRow(updatedData);
  };

  if (!isOpen || !rowData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative bg-white w-1/2 mx-auto my-6 max-w-3xl">
        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
          <h3 className="text-3xl font-semibold">{rowData.transaction_name}</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={onClose}
          >
            <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
          </button>
        </div>
        <div className="relative p-6 flex-auto">
        <form>

            {/* Transaction Type Select */}
            <div className="mb-4">
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-600">Transaction Type</label>
            <select 
            id="transactionType" 
            name="transaction_type"
            value={updatedData.transaction_type}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleInputChange}
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
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Name of transaction (eg. Food)" 
            onChange={handleInputChange}
            />
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
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={handleInputChange}
                />
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
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  onChange={handleInputChange}
                />

            </div>
            </div>


            </form>
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={handleUpdateRow}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
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
