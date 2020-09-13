import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../../components/Button';

const Post = ({ post, remove, add }) => {
  return (
    <article className='card d-flex flex-column bg-light px-lg-4 py-lg-3 p-1 border mb-4'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex w-50'>
          <img
            style={{ width: '80px', height: '80px' }}
            src='http://placehold.it/80x80'
            alt='img'
          />
          <div className='ml-1 ml-lg-3'>
            <h3 className='card-title'>{post.title}</h3>
            <p>
              {`Posted date: ${moment(post.createdAt).format(
                'DD.MM.YYYY',
              )} at ${moment(post.createdAt).format('HH:mm')} by Some Person`}
            </p>
          </div>
        </div>
        <div className='text-right'>
          <Button
            click={() => add(post, false)}
            text='Edit'
            type='button'
            classes='btn-dark'
          />
          <Button
            click={() =>
              remove(post, 'Are you sure you want do delete this post?', false)
            }
            text='Delete'
            type='button'
            classes='btn-dark ml-lg-3 ml-1'
          />
        </div>
      </div>
      <div className='mt-2'>
        <p className='card-text'>{post.text}</p>
        <div className='d-flex justify-content-center'>
          <img src='http://placehold.it/100x100' alt='img' />
          <img className='mx-2' src='http://placehold.it/100x100' alt='img' />
          <img src='http://placehold.it/100x100' alt='img' />
        </div>
      </div>
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};

export default Post;
