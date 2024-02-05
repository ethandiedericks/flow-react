import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const TableRow = ({ rowData, onClick }) => {
  const { transaction_type = 'N/A', transaction_name = 'N/A', transaction_amount, future_transaction_date = 'N/A' } = rowData || {};

  return (
    <tr
      className={`cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
      onClick={() => onClick(rowData)}
    >
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {transaction_type}
      </th>
      <td className="px-6 py-4">{transaction_name}</td>
      <td className="px-6 py-4">{transaction_amount !== undefined ? transaction_amount.toFixed(2) : 'N/A'}</td>
      <td className="px-6 py-4">{future_transaction_date}</td>
    </tr>
  );
};

TableRow.propTypes = {
  rowData: PropTypes.shape({
    transaction_type: PropTypes.string,
    transaction_name: PropTypes.string,
    transaction_amount: PropTypes.number,
    future_transaction_date: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
};

const TableSection = ({ initialTableData, updateChartData }) => {
  const [tableData, setTableData] = useState(initialTableData);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const handleUpdateRow = (updatedRowData) => {
    // Update the tableData state with the modified row data
    const updatedTableData = tableData.map((row) =>
      row.id === updatedRowData.id ? updatedRowData : row
    );
    setTableData(updatedTableData); // Update the state
    setIsModalOpen(false); // Close the modal after successful update

    // Call the updateChartData function to update charts and cards
    updateChartData(updatedRowData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Update the tableData state when the initialTableData prop changes
    setTableData(initialTableData);
  }, [initialTableData]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900">Transactions</h2>
      <p className="text-sm font-medium text-gray-600 italic">(Click on a record to update)</p>

      <div className="mt-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction Date
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <TableRow key={index} rowData={item} onClick={handleRowClick} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        rowData={selectedRow}
        onUpdateRow={handleUpdateRow}
      />
    </div>
  );
};

TableSection.propTypes = {
  initialTableData: PropTypes.arrayOf(
    PropTypes.shape({
      transaction_type: PropTypes.string,
      transaction_name: PropTypes.string,
      transaction_amount: PropTypes.number,
      future_transaction_date: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  updateChartData: PropTypes.func.isRequired,
};

export default TableSection;
