import React from 'react'
import './Categories.css'

import { useNavigate } from 'react-router-dom'

import { Base_url } from '../../Utils/api'
const Categories = ({ categories }) => {
  const navigate =useNavigate()

  if (!categories || !categories.data) {
    return null; // Return null or an alternative component if categories.data is undefined
  }
  return (
    <div className='container'>
      <div className='row'>
        {categories.data.map((item) => (
          <div key={item.id} className='col-md-3'  onClick={()=>navigate(`/category/${item.id}`)} >
            <div className="card 1">
              <div className="card_image"> <img src={Base_url + item.attributes.img.data.attributes.url} alt="Category" /> </div>
              <div className="card_title title-white">
                <p> {item.attributes.title} </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories