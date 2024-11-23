import React, {useEffect,useState} from 'react';
import axios from 'axios'
import './Admin.css'; // Import the CSS file

const Admin = () => {
    const [data, setdata] = useState([]);
    const [items, setitems] = useState({}); 
    const [floorprice, setfloorprice] = useState({}); 
    const handleitems = async (brandId) => {
        try {
            const productResponse = await axios.get(`http://localhost:3000/api/products/${brandId}`);
            setitems(prevCounts => ({
                ...prevCounts,
                [brandId]: productResponse.data.length 
            }));
            handleprice(items)

        } catch (error) {
            console.error(`Error fetching price for brand ID ${brandId}:`, error);
        }
    };

    const handleprice = async (brand) => {
        for (let price in brand) {
            try {
                const priceResponse = await axios.get(`http://localhost:3000/api/products/${price}`);
                const lowestPrice = Math.min(...priceResponse.data.map(item => item.price)); 
                setfloorprice(prev => ({
                    ...prev,
                    [price]: lowestPrice
                }));
            } catch (error) {
                console.error(`Error fetching prices for brand ${price}:`, error);
            }
        }
    }


    useEffect(() => { 
        axios.get("http://localhost:3000/brands/allbrands")
            .then((res) => {
                setdata(res.data);
                res.data.forEach(brand => {
                    handleitems(brand.id);
                });
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-8">
                <h1 className="text-4xl font-bold text-center mb-4">Top Market Statistics</h1>
                <p className="text-center mb-8">The top NFTs on ______, ranked by volume, floor price and other statistics.</p>
                <div className="flex justify-center mb-8">
                    
                    <div className="flex justify-between items-center mb-8">
                    <button
    style={{
        background: 'linear-gradient(90deg, #a445f7, #6a00ff)',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        padding: '10px 20px',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        cursor: 'pointer'
    }}
>
    Marketplace Performance
</button>
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
        {data.map((element, index) => (
            <tr key={index} className="border-b border-gray-700">
                <td className="py-4 flex elements-center space-x-2">
                    <span className="text-purple-500">{element.id}</span>
                    <img src={element.logo} alt={`${element.name} logo`} className="w-10 h-10 rounded-full" />
                    <span>{element.name}</span>
                </td>
                <td className="py-4">{element.volume}</td>
                <td className="py-4 text-green-500">{element.day}</td>
                <td className="py-4">{floorprice[element.id] || 0}</td>
                <td className="py-4">{element.owner}</td>
                <td className="py-4">{items[element.id] || 0}</td>
            </tr>
        ))}
    </tbody>
        </table>
            </main>
        </div>
    );
};

export default Admin;
