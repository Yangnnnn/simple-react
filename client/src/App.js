import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './Card';
const axios = require('axios');
function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const clickHandler = async () => {
    sendPost(title, content);
    setTitle('');
    setContent('');
    getPost();
  };
  useEffect(() => {
    getPost();
  }, []);

  async function sendPost(title, content) {
    try {
      await axios.post('https://134.122.35.213:5000/posts', {
        title,
        content,
      });
      await getPost();
    } catch (error) {
      console.error(error);
    }
  }
  async function getPost() {
    try {
      const response = await axios.get('https://134.122.35.213:5000/posts');

      setPosts(response.data);
    } catch (error) {}
  }

  return (
    <div className='App'>
      <div className='post_area'>
        {posts.map((post, index) => (
          <div key={index} className='post_item'>
            <Card title={post.title} content={post.content} id={post.id}></Card>
          </div>
        ))}
      </div>

      <div className='input_area'>
        <input
          type='text'
          placeholder='title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <br></br>
        <textarea
          rows='4'
          cols='50'
          placeholder='Text'
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          required
        ></textarea>
        <br></br>
        <button
          type='submit'
          onClick={() => {
            clickHandler();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
