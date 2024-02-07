import { Link } from "react-router-dom";
import logo from '../../assets/flow.png';

const Header = () => {
  const isAuthenticated = !!localStorage.getItem("access_token");

  return (
    <nav className="bg-transparent border-gray-200 dark:bg-transparent">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10" alt="Flow" />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  dark:border-gray-100">
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Register
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/logout" className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-gray-900 md:dark:hover:text-green-700 md:dark:hover:bg-transparent ">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-100">
            <li>
              <Link to="/budget" className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:green-blue-500" aria-current="page">
                Budget
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-gray-900 md:dark:hover:text-green-700   md:dark:hover:bg-transparent dark:border-gray-700">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
