import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import { useFormik } from 'formik';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';

const AddModal = ({ selected, close, isCategory, active, submit }) => {
  const [disabled, setDisabled] = useState(true);

  const validate = values => {
    const errors = {};
    if (isCategory) {
      if (!values.name) {
        errors.name = 'Name cannot be empty.';
      }
    } else {
      if (!values.title) {
        errors.title = 'Title cannot be empty.';
      }

      if (!values.text) {
        errors.text = 'Text cannot be empty.';
      }
    }

    Object.keys(errors).length ? setDisabled(true) : setDisabled(false);

    return errors;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isCategory
      ? {
          name: selected ? selected.name : '',
        }
      : {
          title: selected ? selected.title : '',
          text: selected ? selected.text : '',
          categoryId: selected ? selected.categoryId : active ? active.id : 0,
        },
    validate,
    onSubmit: values => {
      const newValues = selected
        ? { ...values, id: selected.id }
        : { ...values };

      submit(newValues);
    },
  });

  return (
    <div
      id='exampleModal'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog m-0 mw-100' role='document'>
        <div className='modal-content'>
          <div className='modal-header bg-light align-items-center py-1'>
            <p className='modal-title' id='exampleModalLabel'>
              {`${selected ? 'Edit' : 'Add'} ${
                isCategory ? 'Category' : 'blog post'
              }`}
            </p>
            <Button
              type='button'
              classes='btn-outline-dark border-0'
              text='x'
              click={close}
            />
          </div>
          <div className='modal-body px-lg-5 pt-5 px-3'>
            <form onSubmit={formik.handleSubmit}>
              {isCategory ? (
                <>
                  <div className='form-group d-flex'>
                    <Input
                      name='name'
                      isRequired
                      value={formik.values.name}
                      type='text'
                      label='Name'
                      id='name'
                      classes='w-100 mx-3'
                      placeholder='Name of the category'
                      change={formik.handleChange}
                      blur={formik.handleBlur('name')}
                      error={formik.touched.name && formik.errors.name}
                      isInvalid={formik.touched.name && !!formik.errors.name}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='form-group d-flex'>
                    <Input
                      name='title'
                      isRequired
                      label='Title'
                      value={formik.values.title}
                      type='text'
                      id='title'
                      classes='w-100 mx-3'
                      placeholder='Title of the post'
                      change={formik.handleChange}
                      blur={formik.handleBlur('title')}
                      error={formik.touched.title && formik.errors.title}
                      isInvalid={formik.touched.title && !!formik.errors.title}
                    />
                  </div>
                  <div className='form-group d-flex'>
                    <Textarea
                      name='text'
                      isRequired
                      label='Text'
                      value={formik.values.text}
                      type='text'
                      id='text'
                      placeholder='Text of the post'
                      change={formik.handleChange}
                      blur={formik.handleBlur('text')}
                      error={formik.touched.text && formik.errors.text}
                      isInvalid={formik.touched.text && !!formik.errors.text}
                    />
                  </div>
                </>
              )}
              <div className='modal-footer border-0 justify-content-around'>
                <Button
                  classes='btn-dark'
                  text={
                    isCategory
                      ? selected
                        ? 'Edit Category'
                        : 'Add Category'
                      : selected
                      ? 'Edit Post'
                      : 'Post'
                  }
                  type='submit'
                  isDisabled={disabled}
                />
                <Button
                  classes='btn-dark'
                  click={close}
                  text='Cancel'
                  type='button'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddModal.propTypes = {
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isCategory: PropTypes.bool,
  selected: PropTypes.object,
  active: PropTypes.object,
};

AddModal.defaultProps = {
  isCategory: false,
  selected: null,
  active: null,
};

export default AddModal;
