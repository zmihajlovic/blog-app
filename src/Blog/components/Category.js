/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

const Category = ({ remove, category, activate, active, add }) => {
  return (
    <li
      className={`nav-item d-flex align-items-center ${
        active?.id === category.id ? 'bg-secondary' : ''
      }`}
    >
      <a
        href='#'
        className={`nav-link flex-fill ${
          active?.id === category.id ? 'text-white' : ''
        }`}
        onClick={() => activate(active?.id === category.id ? null : category)}
      >
        {category.name}
      </a>
      <div>
        <Button
          type='button'
          classes={`btn-outline-dark border-0 ${
            active?.id === category.id ? 'text-white' : ''
          }`}
          icon={<AiFillEdit />}
          click={() => add(category, true)}
        />
        <Button
          type='button'
          classes={`btn-outline-dark border-0 ${
            active?.id === category.id ? 'text-white' : ''
          }`}
          icon={<BsFillTrashFill />}
          click={() =>
            remove(
              category,
              'Are you sure you want do delete this category?',
              true,
            )
          }
        />
      </div>
    </li>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  activate: PropTypes.func.isRequired,
  active: PropTypes.object,
  add: PropTypes.func.isRequired,
};

Category.defaultProps = {
  active: null,
};

export default Category;
