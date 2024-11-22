import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        const fullName = localStorage.getItem('fullName') || decodedToken.fullName || 'Unknown';
        const unique = fullName.split(' ')[0].toLowerCase();
        
        setUser({
          id: decodedToken.id,
          name: fullName,
          username: unique
        });
        
        const savedAvatar = userData.avatar || localStorage.getItem('userAvatar');
        setAvatar(savedAvatar || '/default-avatar.png');
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/user/login");
      }
    } else {
      navigate("/user/login");
    }
  }, [navigate]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'speakeasy');
      formData.append('cloud_name', 'dc9siq9ry');
      try {
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/dc9siq9ry/image/upload',
          formData
        );
        const imageUrl = uploadRes.data.secure_url;
        
        const token = localStorage.getItem('token');
        await axios.put(
          'http://localhost:3000/user/update-avatar',
          { avatar: imageUrl },
          { 
            headers: { 
              Authorization: `Bearer ${token}` 
            } 
          }
        );
        
        localStorage.setItem('userAvatar', imageUrl);
        
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        userData.avatar = imageUrl;
        localStorage.setItem('user', JSON.stringify(userData));
        
        setAvatar(imageUrl);
      } catch (err) {
        console.error('Error uploading image:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/user/login');
        }
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`http://localhost:3000/posts/user/${user.id}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  if (!user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="pageWrapper">
      <div className="profilePage">
        <div className="profileHeader">
          <div className="profilePicture">
            <img
              src={avatar || '/default-avatar.png'}
              alt="Profile Picture"
              height="100"
              width="100"
            />
          </div>
          <div className="uploadAvatarButton" onClick={() => document.getElementById('avatar-upload').click()}>
              <FontAwesomeIcon icon={faCamera} />
            </div>
          <div className="profileActions">
            <div className="createPostButton" onClick={handleCreatePost}>
              <FontAwesomeIcon icon={faPlus} /> Create Post
            </div>
            <div className="editProfileButton">
              <FontAwesomeIcon icon={faEdit} /> Edit Profile
            </div>
          </div>
        </div>
        <div className="profileDetails">
          <h1 style={{ color: "#ffffff" }}>{user.name}</h1>
          <p style={{ color: "#625c70" }}>@{user.username}</p>
          <p style={{ color: "#ffffff" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Torro, consectetur adipiscing elit. Ut urna placerat morbi cursus pulvinar nunc adipiscing.
          </p>
        </div>
        <div className="profilepostContent">
          <div className="sideImages">
            <div className="allPics" style={{ marginTop: "20px" }}>
              <div className="collection">
                <h2 style={{ color: "white", marginBottom: "10px" }}>Photos</h2>
                <div className="photoGrid">
                  <div className="photoItem">
                    <img alt="Photo 1" src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732147116/kx6repm0wazx4n4gslqq.jpg" />
                  </div>
                  <div className="photoItem">
                    <img alt="Photo 2" src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732147134/woezvwj4ezrvlbghazqt.jpg" />
                  </div>
                  <div className="photoItem">
                    <img alt="Photo 3" src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732148871/u2wk3dacfpgbp2sbdo1j.jpg" />
                  </div>
                  <div className="photoItem">
                    <img alt="Photo 4" src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732148652/z5hvletnezlvnugrcyty.jpg" />
                  </div>
                  <div className="photoItem">
                    <img alt="Photo 5" src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732147176/jowusnhigmyabpcky2eb.jpg" />
                  </div>
                  <div className="photoItem">
                    <img alt="Photo 6" src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732147249/jbwlreucquta7wgunotl.jpg" />
                  </div>
                  <div className="photoItem">
                    <img alt="Photo 7" src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732148066/xohcecjgnlo6kgywpap6.jpg" />
                  </div>
                  <div className="photoItem">
                    <img alt="Photo 8" src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732147297/kjjou1jyhihr4is2bpqj.jpg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="metaLook">
              <h2>Meta Look</h2>
              <img alt="Meta Look" src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732147731/ncikeqmudotwwulqxoub.jpg" />
              <div className="metaSliderContainer">
                <button className="metaSliderButton" id="minusButton">-</button>
                <input type="range" className="metaSlider" min="0" max="100" value="40" />
                <button className="metaSliderButton" id="plusButton">+</button>
              </div>
            </div>
          </div>
          <div className="createdPostes">
            <div className="postsSection">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="postContent">
                    <div className="postHeader">
                      <img 
                        src={avatar}
                        alt="Profile" 
                        className="CreatedPostAvatar"
                      />
                      <div className="postInfo">
                        <h3 style={{ color: "#ffffff" }}>{user.name}</h3>
                      </div>
                    </div>
                    <p style={{ color: "#ffffff" }}>{post.content}</p>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="CreatedPostImage"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </div>
        </div>
        <input 
          type="file" 
          id="avatar-upload" 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default Profile;
