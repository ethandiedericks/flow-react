import { Disclosure } from '@headlessui/react';
import PropTypes from 'prop-types';
import classNames from './classNames';

const MobileNavigation = ({ navigation }) => {
  return (
    <Disclosure>
      <Disclosure.Panel className="border-b border-gray-700 md:hidden">
        <div className="space-y-1 px-2 py-3 sm:px-3">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};

MobileNavigation.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      current: PropTypes.bool,
    })
  ).isRequired,
};

export default MobileNavigation;
