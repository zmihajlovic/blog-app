import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  type,
  name,
  value,
  change,
  id,
  label,
  placeholder,
  isRequired,
  error,
  isInvalid,
  blur,
  classes,
}) => {
  let requiredAttr = false;

  if (isRequired) {
    requiredAttr = 'required';
  }

  const onBlur = blur || undefined;

  return (
    <>
      {label && (
        <label className='col-form-label w-25' htmlFor={id}>
          {label}
        </label>
      )}
      <div className={classes}>
        <input
          required={requiredAttr}
          id={id}
          placeholder={placeholder}
          onChange={change}
          type={type}
          className={`form-control ${isInvalid ? 'is-invalid' : 'valid'}`}
          name={name}
          value={value}
          onBlur={onBlur}
          autoComplete='off'
        />
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
      {isRequired && <span style={{ color: 'red' }}>*</span>}
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  error: PropTypes.string,
  isInvalid: PropTypes.bool,
  blur: PropTypes.func,
  classes: PropTypes.string.isRequired,
};

Input.defaultProps = {
  isRequired: false,
  error: undefined,
  isInvalid: false,
  blur: undefined,
  name: undefined,
  id: undefined,
  label: undefined,
};

export default Input;
