import React, { useState, useEffect } from 'react';
import Messages from '../components/Messages';
import Button from '../components/Button';
import Modal from 'react-modal';
import AddModal from './components/AddModal';
import PostApi from '../api/PostApi';
import Post from './components/Post';
import DeleteConfirmation from '../components/DeleteConfirmation';
import Category from './components/Category';
import Input from '../components/Input';
import modalStyle from '../utility/modalStyle';
import useDebounce from '../utility/useDebounce';
import CategoryApi from '../api/CategoryApi';

const Blog = ({ searchPost }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [isCategory, setIsCategory] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isMessage, setIsMessage] = useState(true);
  const debouncedSearchPost = useDebounce(searchPost);
  const debouncedSearchCategory = useDebounce(searchCategory);

  useEffect(() => {
    const getPosts = () => {
      let filters = '';

      if (debouncedSearchPost) {
        filters += `/Search?term=${debouncedSearchPost}`;
      }

      // If activeCategory is set to default(null) all Posts will be displayed
      if (activeCategory) {
        filters += `/GetPostByCategory?categoryId=${activeCategory.id}`;
      }

      PostApi.getPosts(filters).then(res => {
        setPosts(res.data.resultData);
      });
    };

    getPosts();
  }, [activeCategory, debouncedSearchPost]);

  useEffect(() => {
    const getCategories = () => {
      let filters = '';

      if (debouncedSearchCategory) {
        filters += `/Search?name=${debouncedSearchCategory}`;
      }

      CategoryApi.getCategories(filters).then(res => {
        setCategories(res.data.resultData);
      });
    };

    getCategories();
  }, [debouncedSearchCategory]);

  const onAddPost = data => {
    if (selected) {
      PostApi.editPost(selected.id, data);

      const newObj = { ...data };
      const list = [...posts];
      const index = list.indexOf(selected);
      list.splice(index, 1, newObj);
      setPosts(list);
    } else {
      // If activeCategory is set to default(null) created Post will not belong to any Category
      PostApi.addPost(data).then(res => {
        const list = [...posts];
        list.push(res.data);
        setPosts(list);
      });
    }

    closeModal(setIsOpen);
  };

  const onAddCategory = data => {
    if (selected) {
      CategoryApi.editCategory(selected.id, data);

      const newObj = { ...data };
      const list = [...categories];
      const index = list.indexOf(selected);
      list.splice(index, 1, newObj);
      setCategories(list);
    } else {
      CategoryApi.addCategory(data).then(res => {
        const list = [...categories];
        list.push(res.data);
        setCategories(list);
      });
    }

    closeModal(setIsOpen);
  };

  const handleDelete = () => {
    if (isCategory) {
      CategoryApi.deleteCategory(selected.id);

      const list = [...categories];
      const index = list.indexOf(selected);
      list.splice(index, 1);
      setCategories(list);
    } else {
      PostApi.deletePost(selected.id);

      const list = [...posts];
      const index = list.indexOf(selected);
      list.splice(index, 1);
      setPosts(list);
    }

    closeModal(setIsOpenDelete);
  };

  const onDelete = (target, message, bool) => {
    setDeleteMessage(message);
    setIsOpenDelete(true);
    setIsCategory(bool);
    setSelected(target);
  };

  const onAdd = (target, bool) => {
    setIsOpen(true);
    setSelected(target);
    setIsCategory(bool);
  };

  const closeModal = cb => {
    cb(false);

    setTimeout(() => {
      setSelected(null);
      setIsCategory(false);
    }, 500);
  };

  const onSetActiveCategory = data => {
    setActiveCategory(data);
  };

  const onSearchCategory = e => {
    setSearchCategory(e.target.value);
  };

  const onSetIsMessage = () => {
    setIsMessage(!isMessage);
  };

  return (
    <>
      <main>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 col-lg-9 offset-lg-3 py-3'>
              <h1>Welcome to My Blog</h1>
              {isMessage ? (
                <Messages
                  title='Welcome to my Blog'
                  text='Container for showing application messages'
                  close={onSetIsMessage}
                />
              ) : (
                <Button
                  classes='btn-dark d-block'
                  text='Open message box'
                  click={onSetIsMessage}
                  type='button'
                />
              )}
            </div>
          </div>
          <div className='row'>
            <aside className='mb-3 mb-lg-0 col-12 col-lg-3'>
              <Button
                click={() => onAdd(null, true)}
                text='Add Category'
                type='button'
                classes='btn-dark'
              />
              <Input
                classes='mt-3'
                type='search'
                placeholder='Search Category'
                change={onSearchCategory}
                value={searchCategory}
              />
              <div className='mt-3 p-3 border'>
                <h4 className='mb-4'>Blog categories</h4>
                {categories.length ? (
                  <ul className='list-group flex-wrap flex-row mx-n3 flex-lg-column'>
                    {categories.map(category => {
                      return (
                        <Category
                          key={category.id}
                          remove={onDelete}
                          category={category}
                          active={activeCategory}
                          add={onAdd}
                          activate={onSetActiveCategory}
                        />
                      );
                    })}
                  </ul>
                ) : searchCategory !== '' ? (
                  <p>No Categories found</p>
                ) : (
                  <p>No Categories</p>
                )}
              </div>
            </aside>
            <div className='col-12 col-lg-9'>
              <Button
                click={() => onAdd(null, false)}
                text='Add Post'
                type='button'
                classes='btn-dark ml-lg-auto d-block'
              />
              <div className='mt-3'>
                {posts.length ? (
                  posts.map(post => {
                    return (
                      <Post
                        key={post.id}
                        add={onAdd}
                        remove={onDelete}
                        post={post}
                      />
                    );
                  })
                ) : searchPost !== '' ? (
                  <p>No Posts found</p>
                ) : activeCategory ? (
                  <p>No Posts in this Category</p>
                ) : (
                  <p>No Posts</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        closeTimeoutMS={300}
        style={modalStyle}
        onRequestClose={() => closeModal(setIsOpen)}
        contentLabel='Interaction Modal'
      >
        <AddModal
          selected={selected}
          close={() => closeModal(setIsOpen)}
          isCategory={isCategory}
          active={activeCategory}
          submit={isCategory ? onAddCategory : onAddPost}
        />
      </Modal>

      <Modal
        isOpen={isOpenDelete}
        ariaHideApp={false}
        closeTimeoutMS={300}
        style={modalStyle}
        onRequestClose={() => closeModal(setIsOpenDelete)}
        contentLabel='Delete Modal'
      >
        <DeleteConfirmation
          close={() => closeModal(setIsOpenDelete)}
          title={deleteMessage}
          remove={handleDelete}
        />
      </Modal>
    </>
  );
};

export default Blog;
