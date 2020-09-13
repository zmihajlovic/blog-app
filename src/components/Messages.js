import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Messages = ({ text, close }) => {
  return (
    <div className='bg-light border px-3 pb-3'>
      <div className='action mb-2 text-right'>
        <Button
          type='button'
          classes='btn-outline-dark border-0'
          text='x'
          click={close}
        />
      </div>
      <p className='m-0'>{text}</p>
    </div>
  );
};

Messages.propTypes = {
  text: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Messages;
