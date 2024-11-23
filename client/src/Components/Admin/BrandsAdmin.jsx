import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import '../Admin/BrandsAdmin.css'; // Import the CSS file for styling



const BrandAdmin = () => {
    const [brands, setBrands] = useState([]);
    const handledelete = (id) => {
        axios.delete(`http://localhost:3000/brands/delete/${id}`)
        .then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Brand successfully deleted',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        window.location.reload()
        })
        .catch((err)=>console.log(err))
    }

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get("http://localhost:3000/brands/allbrands"); // Adjust the endpoint as necessary
                setBrands(response.data);
                console.log(response.data); // Log the fetched brands
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchBrands();
    }, []);

    return (
        <div className="brand-grid-container">
            {brands.map((brand) => (
                <div className="brand-card" key={brand.id}>
                    {brand.logo ? (
                        <img src={brand.logo} alt={`${brand.name} logo`} className="brand-logo" />
                    ) : (
                        <div className="brand-logo-placeholder">No Logo Available</div>
                    )}
                    <h3 className="brand-name">{brand.name}</h3>
                    <div className="button-container">
                        <button className="brand-button green-button">Verify</button>
                        <button className="brand-button red-button" onClick={()=>handledelete(brand.id)}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BrandAdmin;



;