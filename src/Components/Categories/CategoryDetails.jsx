import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Categories.css';
import { fetchDataFromApi } from '../../Utils/api';
import { Base_url } from '../../Utils/api';
import { useNavigate } from 'react-router-dom'

const CategoryDetails = () => {
  const { id } = useParams();
  const [sub, setSub] = useState(null); // Initialize as null or an empty object
  const navigate =useNavigate()
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    fetchDataFromApi(`/api/categories/${id}?populate=subcategories.img`)
      .then((res) => {
        console.log('API response:', res);
        setSub(res); // Set sub to the entire API response object
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setSub(null); // Set sub to null to indicate an error
      });
  };

  if (sub === null) {
    // Handle the case where data is being fetched or an error occurred
    return <div>Loading...</div>; // You can replace this with an appropriate message
  }

  // Access data directly from the sub object
  const category = sub.data;
  const subcategories = category?.attributes?.subcategories?.data || [];

  return (
    <div className='container'>
      <div className='row'>
        {subcategories.map((item) => (
          <div key={item.id} className='col-md-3'  onClick={()=>navigate(`/subcategry/${item.id}`)} >
            <div className="card 1">
              <div className="card_image"> <img src={Base_url + item?.attributes?.img?.data[0]?.attributes?.url} alt="Category" /> </div>
              <div className="card_title title-white">
                <p>{item?.attributes?.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
 