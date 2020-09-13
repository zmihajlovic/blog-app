import React, { useState } from 'react';
import './App.css';
import Blog from './Blog/Blog';
import Header from './components/Header';

function App() {
  const [searchPost, setSearchPost] = useState('');

  const onSearchPost = e => {
    setSearchPost(e.target.value);
  };

  return (
    <>
      <Header value={searchPost} search={onSearchPost} />
      <Blog searchPost={searchPost} setSearchPost={setSearchPost} />
    </>
  );
}

export default App;
