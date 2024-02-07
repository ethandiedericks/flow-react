import React from 'react';
import { Link } from "react-router-dom";
import logout from '../../components/auth/Logout';

const Logout = () => {

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-3xl font-semibold mb-8'>
                You've been successfully logged out!
            </h1>
            <Link
                to="/login"
                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300"
                onClick={handleLogout}
            >
                Sign in again
            </Link>
        </div>
    );
}

export default Logout;
