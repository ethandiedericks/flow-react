import React from 'react';
import Header from "../components/common/Header";
import CreateTransactionForm from "../components/budget/CreateTransactionForm";

const Budget = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <CreateTransactionForm />
      </main>
    </div>
  );
}

export default Budget;
