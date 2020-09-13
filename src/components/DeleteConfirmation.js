import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const DeleteConfirmation = ({ close, remove, title }) => {
  return (
    <>
      <div className='d-block position-static shadow'>
        <div className='modal-dialog m-0 mw-100'>
          <div className='modal-content'>
            <div className='modal-header justify-content-end border-bottom-0 pb-0'>
              <Button
                type='button'
                classes='btn-outline-dark border-0'
                text='x'
                click={close}
              />
            </div>
            <div className='modal-body'>
              <h5 className='modal-title'>{title}</h5>
            </div>
            <div className='modal-footer border-top-0 pt-0'>
              <Button
                classes='btn-dark'
                type='button'
                text='Delete'
                click={remove}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DeleteConfirmation.propTypes = {
  close: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteConfirmation;
