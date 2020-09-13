import React from 'react';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';
import Input from './Input';

const Header = ({ search, value }) => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg bg-dark'>
        <a className='navbar-brand text-white mr-1' href='#home'>
          My Blog
        </a>

        <Input
          classes='mr-3 w-50 ml-auto d-block d-lg-none'
          type='search'
          placeholder='Search Blog'
          change={search}
          value={value}
        />

        <button
          className='navbar-toggler text-white'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <FaBars />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <Input
            classes='mr-sm-2 ml-auto d-none d-lg-block'
            type='search'
            placeholder='Search Blog'
            change={search}
            value={value}
          />
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link text-white' href='#link1'>
                Link 1
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white' href='#link2'>
                Link 2
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white' href='#link3'>
                Link 3
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white' href='#link3'>
                My Profile
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white' href='#link3'>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  value: PropTypes.string,
  search: PropTypes.func.isRequired,
};

Header.defaultProps = {
  value: '',
};

export default Header;
