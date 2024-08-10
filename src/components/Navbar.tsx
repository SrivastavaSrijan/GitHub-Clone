import { Link } from 'react-router-dom';
import { RoutesConfig } from '../constants';
import { SearchOrganizations } from './SearchOrganizations';

export const Navbar = () => {
  return (
    <nav className="bg-base-200">
      <div className="navbar container flex-wrap gap-2 mx-auto md:px-2 md:py-3 px-4 py-2 justify-between items-center">
        <Link to={RoutesConfig.HOME}>
          <img
            src="/github.png"
            alt="GitHub Logo"
            className="md:h-10 md:w-10 h-8 w-8"
          />
        </Link>
        <SearchOrganizations />
      </div>
    </nav>
  );
};
