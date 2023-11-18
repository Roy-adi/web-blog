import React from 'react';
import { Base_url } from '../../Utils/api';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import './Banner.css'

const Banner = ({ categories }) => {
  const navigate = useNavigate();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  }

  if (!categories || !categories.data) {
    return null; // You can return null or a loading indicator
  }

  console.log(categories,'one');

  return (
    <div className='container-fluid'>
      <Carousel
        className="slider-banner-container"
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        showDots={false}
        slidesToSlide={1}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
      {categories.data.slice(0, 8).map((item) => {
        console.log('Item:', item);
      
        // Check if item.attributes.img.data is an object and contains the "url" property
        const imgData = item.attributes.img.data;
        
        if (imgData && imgData.attributes && imgData.attributes.url) {
          const imgSrc = imgData.attributes.url;
          console.log('Image Source:', imgSrc);
      
          return (
            <div key={item.id} className='banner-img' style={{ backgroundImage: `url(${Base_url + imgSrc})` }}  onClick={() => navigate(`/category/${item.id}`)} >
              <div className='banner-title'>
                <h4>{item.attributes.title}</h4>
              </div>
            </div>
          );
        } else {
          // Handle the case when image data is missing or incomplete
          console.log('Image Source: (Not Available)');
          return null;
        }
      })}
      
      </Carousel>
    </div>
  );
};

export default Banner;
