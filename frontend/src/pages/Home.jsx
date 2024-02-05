import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-green-500 to-teal-700 text-white min-h-screen">
      <div className="container mx-auto p-8">
        {/* Professional Hero Section */}
        <section className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl font-bold mb-4">Empower Your Finances with Flow</h1>
          <p className="text-lg text-center mb-8">
            Take control of your financial journey with our professional budget management app.
          </p>
          <Link
            to="/login"
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
          >
            Get Started
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2">Track your expenses and income</li>
              <li className="mb-2">Create and manage budgets</li>
              <li>Visualize your financial data with charts</li>
            </ul>
          </div>

          {/* ... other feature items ... */}

        </section>

        {/* About Us Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <div className="bg-white p-8 rounded-lg shadow-md text-gray-800">
            <p>Discover our mission and how we can help you achieve your financial goals.</p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ... your existing "Why Choose Us" content ... */}
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <img src="/screenshot1.jpg" alt="Screenshot 1" className="rounded-lg shadow-md mb-4" />
            <img src="/screenshot2.jpg" alt="Screenshot 2" className="rounded-lg shadow-md mb-4" />
            <img src="/screenshot3.jpg" alt="Screenshot 3" className="rounded-lg shadow-md mb-4" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
