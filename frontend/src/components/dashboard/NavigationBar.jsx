import PropTypes from 'prop-types';
import NavigationLinks from './NavigationLinks';
import { Link } from 'react-router-dom';
import { logo } from '../../assets';

const NavigationBar = ({ navigation }) => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="border-b border-gray-700">
        <div className="flex h-16 items-center justify-between px-4 sm:px-0">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8"
                src={logo}
                alt="Flow"
              />
            </div>
            <div>
              <NavigationLinks items={navigation} />
            </div>
          </div>
  
          <div className="-mr-2 flex">
            <Link to="/logout" className="block py-2 px-3 text-gray-300 rounded font-medium hover:bg-gray-700 hover:text-white text-sm ">
                  Logout
            </Link>
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
  userNavigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NavigationBar;
