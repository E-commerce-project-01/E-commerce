import React, {useEffect,useState} from 'react';
import axios from 'axios'
import './Admin.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faWallet } from '@fortawesome/free-solid-svg-icons'; // Correct import for faWallet
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
    const [data, setdata] = useState([]);

    useEffect(() => { 
        axios.get("http://localhost:3000/brands/allbrands")
            .then((res) => {
                setdata(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className="min-h-screen flex flex-col">
           <header className="header">
                <div className="flex items-center space-x-4 ml-4">
                    <div className="text-2xl font-bold">Logo</div>
                    <div className="search-bar relative">
                        <input
                            type="text"
                            placeholder="Search items, Portfolios, Collection and Users"
                            className="px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none pr-10" 
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-2 text-gray-400" />
                    </div>
                </div>
                <nav className="flex items-center space-x-6">
                    <a className="hover:text-gray-400">Home</a>
                    <a className="hover:text-gray-400">Explore</a>
                    <a className="hover:text-gray-400">Personal Collection</a>
                    <a className="hover:text-gray-400">Drops</a>
                    <a className="hover:text-gray-400">More</a>
                    <FontAwesomeIcon icon={faBell} className="hover:text-gray-400" />
                    <FontAwesomeIcon icon={faWallet} className="hover:text-gray-400" />
                    <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </nav>
            </header>
            <main className="flex-grow p-8">
                <h1 className="text-4xl font-bold text-center mb-4">Top Market Statistics</h1>
                <p className="text-center mb-8">The top NFTs on ______, ranked by volume, floor price and other statistics.</p>
                <div className="flex justify-center mb-8">
                    
                    <div className="flex justify-between items-center mb-8">
    <button className="px-4 py-2 bg-purple-600 rounded-full text-white">Marketplace Performance</button>
           <div className="flex items-center space-x-4 ml-4 justify-end"> 
                  <select className="px-4 py-2 bg-gray-800 rounded-full text-white">
                  <option>Last 7 Days</option>
                  </select>
                  <select className="px-4 py-2 bg-gray-800 rounded-full text-white">
                  <option>All Categories</option>
                  </select>
            </div>
                    </div>       
                </div>
        <table className="w-full text-left">
         <thead>
        <tr className="text-gray-400">
            <th className="py-2">Collection</th>
            <th className="py-2">Volume</th>
            <th className="py-2">24H%</th>
            <th className="py-2">Floor Price</th>
            <th className="py-2">Owners</th>
            <th className="py-2">Items</th>
        </tr>
        </thead>
    <tbody>
        {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-700">
                <td className="py-4 flex items-center space-x-2">
                    <span className="text-purple-500">{item.id}</span>
                    <img src={item.logo} alt={`${item.name} logo`} className="w-10 h-10 rounded-full" />
                    <span>{item.name}</span>
                </td>
                <td className="py-4">{item.volume}</td>
                <td className="py-4 text-green-500">{item.day}</td>
                <td className="py-4">{item.floorprice}</td>
                <td className="py-4">{item.owner}</td>
                <td className="py-4">{item.items}</td>
            </tr>
        ))}
    </tbody>
        </table>
                <div className="flex justify-center mt-8">
                    <button className="px-4 py-2 bg-gray-800 rounded-full text-white">1 - 100</button>
                    <button className="px-4 py-2 bg-gray-800 rounded-full text-white ml-4">101 - 200</button>
                </div>
            </main>
            <footer className="bg-transparent p-8">
    <div className="flex justify-between">
        <div className="flex-1 text-center">
            <div className="text-2xl font-bold">LOGO</div>
            <p className="text-gray-400 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nullam scelerisque leo non pellentesque luctus.
                <br />
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
        <div className="flex-1 text-center">
            <h3 className="font-bold mb-2">About</h3>
            <ul className="text-gray-400 space-y-1">
                <li>Product</li>
                <li>Resource</li>
                <li>Term & Condition</li>
                <li>FAQ</li>
            </ul>
        </div>
        <div className="flex-1 text-center">
            <h3 className="font-bold mb-2">Company</h3>
            <ul className="text-gray-400 space-y-1">
                <li>Our Team</li>
                <li>Partner With Us</li>
                <li>Privacy & Policy</li>
                <li>Features</li>
            </ul>
        </div>
        <div className="flex-1 text-center">
            <h3 className="font-bold mb-2">Contact</h3>
            <ul className="text-gray-400 space-y-1">
                <li>+012 3456789</li>
                <li>abcd@designarena@gmail.com</li>
                <li className="flex space-x-2">
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faLinkedin} />
                </li>
            </ul>
        </div>
    </div>
</footer>
        </div>
    );
};

export default Admin;