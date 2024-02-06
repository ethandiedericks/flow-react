import React from 'react';
import PropTypes from 'prop-types';

const GridCard = ({ color, icon, title, amount }) => {
  const amountValue = typeof amount === 'string' ? parseFloat(amount) : amount;

  return (
    <div className={`bg-white overflow-hidden shadow-lg rounded-lg border-l-4 ${color === 'green' ? 'border-green-500' : color === 'red' ? 'border-red-500' : color === 'blue' ? 'border-blue-500' : ''} temp-bg-blue-500`}>
      <div className="p-6 flex items-center">
        <div className={`mr-4 text-${color}-500`}>{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-gray-600 text-xl font-bold">{amountValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

GridCard.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default GridCard;
