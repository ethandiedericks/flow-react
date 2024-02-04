import PropTypes from 'prop-types';
import NavigationLinks from './NavigationLinks';
import { Disclosure } from '@headlessui/react';
import UserProfileDropdown from './UserProfileDropdown';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NavigationBar = ({ navigation, user, userNavigation }) => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="border-b border-gray-700">
        <div className="flex h-16 items-center justify-between px-4 sm:px-0">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden md:block">
              <NavigationLinks items={navigation} />
            </div>
          </div>
          <UserProfileDropdown user={user} items={userNavigation} />
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <Disclosure>
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  );
};

NavigationBar.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      current: PropTypes.bool,
    })
  ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  userNavigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NavigationBar;
