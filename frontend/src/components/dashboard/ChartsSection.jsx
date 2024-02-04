import React from 'react';
import PropTypes from 'prop-types';
import ApexCharts from 'react-apexcharts';

const ChartsSection = ({ incomeTotal, expenseTotal, investmentTotal }) => {
  const barChartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: ['Income', 'Expenses', 'Investments'],
    },
  };

  const doughnutChartData = [incomeTotal || 0, expenseTotal || 0, investmentTotal || 0];

  const doughnutChartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Income', 'Expenses', 'Investments'],
    series: doughnutChartData,
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mt-20">
      {/* Bar Chart */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <h3 className="text-lg font-medium text-gray-900">Income and Expenses (Bar Chart)</h3>
          <ApexCharts options={barChartOptions} series={[{ name: 'Amount', data: [incomeTotal, expenseTotal, investmentTotal] }]} type="bar" height={300} />
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <h3 className="text-lg font-medium text-gray-900">Investments (Doughnut Chart)</h3>
          <ApexCharts options={doughnutChartOptions} series={doughnutChartData} type="donut" height={300} />
        </div>
      </div>
    </div>
  );
};

ChartsSection.propTypes = {
  incomeTotal: PropTypes.number,
  expenseTotal: PropTypes.number,
  investmentTotal: PropTypes.number,
};

export default ChartsSection;
