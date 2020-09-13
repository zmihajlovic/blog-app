import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
  name,
  placeholder,
  value,
  label,
  isRequired,
  isInvalid,
  change,
  error,
  id,
  blur,
}) => {
  let requiredAttr = false;

  if (isRequired) {
    requiredAttr = 'required';
  }

  const onChange = change || undefined;
  const onBlur = blur || undefined;

  return (
    <>
      {label && (
        <label className='col-form-label w-25' htmlFor={name}>
          {label}
        </label>
      )}
      <div className='w-100 mx-3'>
        <textarea
          className={`form-control ${isInvalid ? 'is-invalid' : 'valid'}`}
          type='textarea'
          name={name}
          value={value}
          id={id}
          placeholder={placeholder}
          required={requiredAttr}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className='invalid-feedback'>{error}</div>
      </div>
      {isRequired && <span style={{ color: 'red' }}>*</span>}
    </>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  change: PropTypes.func,
  error: PropTypes.string,
  isInvalid: PropTypes.bool,
  id: PropTypes.string,
  blur: PropTypes.func,
};

Textarea.defaultProps = {
  value: '',
  placeholder: '',
  label: '',
  isRequired: false,
  change: undefined,
  error: undefined,
  isInvalid: false,
  id: undefined,
  blur: undefined,
};

export default Textarea;
