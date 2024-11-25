import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../Admin/BrandsAdmin.css'; // Import the CSS file for styling



const BrandAdmin = () => {
    const navigate=useNavigate()
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

    const handleverify = (id) => {
        
        const checkverify = id.verified === 1 ? 0 : 1;
            axios.put(`http://localhost:3000/brands/update/${id}`, { verified: checkverify })
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: `Brand verification status updated to ${checkverify === 1 ? 'verified' : 'unverified'}.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/Admin", { state: { updated: true } });
            })
            .catch((err) => {
                console.error("Error updating brand verification status:", err);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update brand verification status.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

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
        <div>
            {console.log(brands)}
        <div className="admin-brand-grid-container">
            {brands.map((brand) => (
                    <div className="admin-brand-card" key={brand.id}>
                    
                        <div className="admin-logo-container">
                        <img src={brand.logo} alt={`${brand.name} logo`} className="admin-brand-logo"  onClick={()=>navigate("/adminbrandproducts",{ state: { brandId: brand.id } })}/>
                       
                        </div>
                    <h3 className="admin-brand-name">{brand.name}</h3>
                    <div className="admin-button-container">
                        <button className="admin-brand-button admin-green-button"onClick={()=>handleverify(brand.id)} >Verify</button>
                        <button className="admin-brand-button admin-red-button" onClick={()=>handledelete(brand.id)}>Remove</button>
                    </div>
                </div>
            ))}
             <button className="Users" onClick={() => navigate("/Admin")}>
                Back
            </button>
        </div>
        </div>
    );
};

export default BrandAdmin;



;