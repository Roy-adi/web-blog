import React, { useState } from 'react';
import './BlogCard.css'; // Import your CSS module
import { Base_url } from '../../Utils/api';

function BlogCard({ blog }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!blog) {
    // Handle the case where blog is null or undefined
    return null; // Or you can render a placeholder or an error message
  }

  console.log(blog,'kk');

  const imgData = blog.attributes?.img?.data?.attributes?.url || '';
  const title = blog.attributes?.title || 'Title Goes Here';
  const description = blog.attributes?.desc || 'And Subtitle Goes Here.';
  const tags = blog.attributes?.subcategory.data.attributes.title || 'Title Goes Here';
  const name = blog.attributes?.Name || "no user"

  // Split the description into words
  const words = description.split(' ');

  // Determine whether to show "Read more" text
  const showReadMore = words.length > 20;

  return (
    <div className={`post-module ${isHovered ? 'hover' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="thumbnail">
        <img src={Base_url + imgData} alt={title} />
      </div>
      <div className="post-content">
        <div className="category"> {tags} </div>
        <h1 className="title"> {title} </h1>
        <h2 className="sub_title"> {name} </h2>
        <p className={`description ${isHovered ? 'hover' : ''}`}>
          {showReadMore ? words.slice(0, 20).join(' ') : description}
          {showReadMore && (
            <span className="read-more">Read more</span>
          )}
        </p>
        <div className="post-meta">
          <span className="timestamp">
            <i className="fa fa-clock-o"></i> 6 mins ago
          </span>
          <span className="comments">
            <i className="fa fa-comments"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
