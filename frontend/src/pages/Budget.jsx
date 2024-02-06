import React from 'react';
import Header from "../components/common/Header";
import CreateTransactionForm from "../components/budget/CreateTransactionForm";
import { background } from '../assets';
import { budgetImage } from '../assets';

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
        <div className='grid-cols-2 lg:gap-x-[100px] md:gap-x-[auto] justify-center items-center place-content-center h-[90vh] flex backdrop-blur-sm'>
          <div className='lg:w-[450px] md:w-auto p-6  border border-gray-200 rounded-lg shadow  dark:border-gray-200 flex justify-center items-center backdrop-blur-sm'>
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
