import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "../Admin/Admin.css"
const App = () => {
    const [data,setdata]=useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/brands/allbrands")
        .then((res)=> setdata(res.data))
        .catch((err)=> console.log(err))
    },[])
  return (
    <div>

    <div className="container">
      <div className="header">
        <div className="logo">Logo</div>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input placeholder="Search items, Portfolio, Collection" type="text" />
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Explore</a>
          <a href="#">Personal Collection</a>
          <a href="#">Drops</a>
          <a href="#">More</a>
          <i className="fas fa-bell"></i>
          <i className="fas fa-wallet"></i>
          <div
            className="profile-pic"
            style={{
              backgroundColor: '#6C63FF',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
            }}
          ></div>
        </div>
      </div>

      <div className="main-content">
        <h1>Top Market Statistics</h1>
        <p>The top NFTs on _____, ranked by volume, floor price and other statistics.</p>
        <button className="btn">Marketplace Performance</button>
      </div>

      <div className="filters">
        <button className="filter-btn">Last 7 Days</button>
        <button className="filter-btn">All Categories</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Collection</th>
              <th>Volume</th>
              <th>24H%</th>
              <th>7D%</th>
              <th>Floor Price</th>
              <th>Owners</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el)=>{
            <tr>
            <td>
              <span>1</span>
              <img
                alt="brand logo"
                height="40"
                src={el.logo}
                width="40"
              />
              {el.name}
              <i className="fas fa-check-circle verified"></i>
            </td>
            <td>{el.volume}</td>
            <td className="positive">{el.day}</td>
            <td className="negative">{el.floorprice}</td>
            <td>{el.owner}</td>
            <td>{el.items}</td>
          </tr>

            })
            }          
            </tbody>
        </table>
      </div>
    </div>
        </div>

  );
};

export default App;
