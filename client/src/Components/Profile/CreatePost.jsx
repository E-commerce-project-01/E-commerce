import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './CreatePost.css';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const postData = {
        content,
        image,
        userId: decodedToken.id
      };

      
      await axios.post('http://localhost:3000/posts/create', postData);
      navigate('/profile');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'speakeasy');
      data.append('cloud_name', 'dc9siq9ry');
      try {
        const res = await axios.post('https://api.cloudinary.com/v1_1/dc9siq9ry/image/upload', data);
        setImage(res.data.secure_url);
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }
  };

  return (
    <div className="CreatedPostBackground">
      <div className="CreatedPostWrapper">
        <div className="CreatedPostForm">
          <h2>Create New Post</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              required
              className="CreatedPostArea"
            />
            <div className="CreatedImageSection">
              <input
                type="file"
                id="post-image"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                className="CreatedImageSelector"
              />
              <div 
                className="CreatedImageAdd" 
                onClick={() => document.getElementById('post-image').click()}
              >
                <i className="fas fa-image"></i> Add Image
              </div>
              {image && <img src={image} alt="Preview" className="CreatedImagePreview" />}
            </div>
            <div className="CreatedPostSubmit" onClick={handleSubmit}>Post</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost; 