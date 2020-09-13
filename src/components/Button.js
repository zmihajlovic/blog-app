import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, text, click, isDisabled, classes, icon }) => {
  return (
    <button
      className={`btn btn-sm ${classes}`}
      disabled={isDisabled}
      onClick={click}
      type={type}
    >
      {text || icon}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  click: PropTypes.func,
  isDisabled: PropTypes.bool,
  classes: PropTypes.string,
  icon: PropTypes.object,
};

Button.defaultProps = {
  isDisabled: false,
  click: undefined,
  text: undefined,
  icon: undefined,
  classes: undefined,
};

export default Button;
