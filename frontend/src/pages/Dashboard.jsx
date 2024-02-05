import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/dashboard/NavigationBar';
import MobileNavigation from '../components/dashboard/MobileNavigation';
import PageHeader from '../components/dashboard/PageHeader';
import GridCard from '../components/dashboard/GridCards';
import ChartsSection from '../components/dashboard/ChartsSection';
import TableSection from '../components/dashboard/TableSection';
import axiosInstance from '../axios';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Budget', href: '/budget', current: false },
];

const userNavigation = [
  { name: 'Login', href: '/login' },
  { name: 'Sign Up', href: '/register' },
];


const Dashboard = () => {
  const [budgetSummary, setBudgetSummary] = useState(/* initial state */);
  const [chartData, setChartData] = useState({
    incomeTotal: 0,
    expenseTotal: 0,
    investmentTotal: 0,
  });
  useEffect(() => {
    const fetchBudgetSummary = async () => {
      try {
        const response = await axiosInstance.get('budget-summary/');
        setBudgetSummary(response.data);

        // Update chart data when budget summary is fetched
        setChartData({
          incomeTotal: response.data.income_total || 0,
          expenseTotal: response.data.expense_total || 0,
          investmentTotal: response.data.investment_total || 0,
        });
      } catch (error) {
        console.error('Error fetching budget summary:', error);
      }
    };

    fetchBudgetSummary();
  }, []);

// Function to update chart and card data
const updateChartDataAndCards = async (updatedRowData) => {
  try {
    // Make a GET request to 'budget-summary' to fetch the updated data
    const response = await axiosInstance.get('budget-summary/');
    const updatedBudgetSummary = response.data;

    // Update chart data with the new totals
    setChartData({
      incomeTotal: updatedBudgetSummary.income_total || 0,
      expenseTotal: updatedBudgetSummary.expense_total || 0,
      investmentTotal: updatedBudgetSummary.investment_total || 0,
    });

    // Update card data with the new totals
    setBudgetSummary({
      ...budgetSummary,
      income_total: updatedBudgetSummary.income_total || 0,
      expense_total: updatedBudgetSummary.expense_total || 0,
      investment_total: updatedBudgetSummary.investment_total || 0,
      table_data: updatedBudgetSummary.table_data || [],
    });
  } catch (error) {
    console.error('Error updating chart and card data:', error);
  }
};



  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <NavigationBar navigation={navigation} user={user} userNavigation={userNavigation} />
        <MobileNavigation navigation={navigation} />
        {/* Page Header */}
        <PageHeader title="Dashboard" />
      </div>

      {/* Main Content */}
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 -mt-32">
          {/* Grid Cards Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 (Income) */}
            <GridCard
              color="green"
              icon={
                <svg
                  className="h-8 w-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              }
              title="Income"
              amount={budgetSummary?.income_total?.toFixed(2) || 0}
            />

            {/* Card 2 (Expenses) */}
            <GridCard
              color="red"
              icon={
                <svg
                  className="h-8 w-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              }
              title="Expenses"
              amount={budgetSummary?.expense_total?.toFixed(2) || 0}
            />

            {/* Card 3 (Investments) */}
            <GridCard
              color="blue"
              icon={
                <svg
                  className="h-8 w-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 6l-7.5 12L3 6" />
                </svg>
              }
              title="Investments"
              amount={budgetSummary?.investment_total?.toFixed(2) || 0}
            />
          </div>


          {/* Charts Section */}
          <ChartsSection
            incomeTotal={chartData.incomeTotal}
            expenseTotal={chartData.expenseTotal}
            investmentTotal={chartData.investmentTotal}
          />

          {/* Table Section */}
          <TableSection
            tableData={budgetSummary?.table_data || []}
            initialTableData={budgetSummary?.table_data || []}
            updateChartData={updateChartDataAndCards}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
