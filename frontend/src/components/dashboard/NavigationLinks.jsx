import classNames from './classNames';
import PropTypes from 'prop-types'

const NavigationLinks = ({ items }) => (
  <div className="ml-10 flex items-baseline space-x-4">
    {items.map((item) => (
      <a
        key={item.name}
        href={item.href}
        className={classNames(
          item.current
            ? 'bg-gray-900 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
          'rounded-md px-3 py-2 text-sm font-medium'
        )}
        aria-current={item.current ? 'page' : undefined}
      >
        {item.name}
      </a>
    ))}
  </div>
);

NavigationLinks.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      current: PropTypes.bool,
    })
  ).isRequired,
};

export default NavigationLinks;