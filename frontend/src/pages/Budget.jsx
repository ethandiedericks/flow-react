import React from 'react';
import Header from "../components/common/Header";
import CreateTransactionForm from "../components/budget/CreateTransactionForm";
import { background, budgetImage } from "../assets";

const Budget = () => {
  const mainSectionStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={mainSectionStyle}>
      <header>
        <Header />
      </header>
      <main>
        <div className='grid-cols-2 lg:gap-x-[100px] md:gap-x-[auto] justify-center items-center place-content-center h-[90vh] flex'>
          <div className='lg:w-[450px] md:w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center'>
            <CreateTransactionForm />
          </div>
          <div className='hidden md:block lg:w-[450px] md:w-[380px] justify-center items-center'>
            <img src={budgetImage} className='h-80' />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Budget;
