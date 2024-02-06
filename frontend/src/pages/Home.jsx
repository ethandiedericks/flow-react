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
      </div>
    </div>
  );
}

export default Home;
