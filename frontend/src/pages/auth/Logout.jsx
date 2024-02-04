import React from 'react';
import { Link } from "react-router-dom";
import logout from '../../components/auth/Logout';

const Logout = () => {

    const handleLogout = async () => {
        await logout();
    };
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='flex flex-col max-h-screen'>
        <h1>
          You've been successfully logged out!
        </h1>
        <Link to="/login" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={handleLogout}>
            Sign in again
        </Link>
      </div>
    </div>
  );
}

export default Logout;
