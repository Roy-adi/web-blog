import React, { useEffect, useState } from 'react';
import './BlogDetails.css';
import { useParams } from 'react-router-dom';
import { Base_url, fetchDataFromApi } from '../../Utils/api';

const BlogDetails = () => {
  const [data, setData] = useState(null); // Initialize data as null
  const { id } = useParams();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    fetchDataFromApi(`/api/blogs?populate=*&[filters][id]=${id}`)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.error('Error fetching blog data: ', error);
        setData(null); // Set data to null in case of an error
      });
  };

  if (data === null) {
    // Handle the case where data is still loading or an error occurred
    return <p>Loading...</p>; // You can render a loading message or error message
  }

  const blog = data?.data?.[0]?.attributes;
  console.log('Data:', data);
console.log('Blog:', blog);

  if (!blog) {
    return <p>Blog not found.</p>; // Handle the case where the blog is not found
  }

  return (
    <section className="aboutus-sec">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5">
          <div className="aboutus-img">
  {blog.img && blog.img.data && blog.img.data.attributes && (
    <img
      src={Base_url + blog.img.data.attributes.url}
      alt={blog.title}
    />
  )}
</div>

          </div>
          <div className="col-md-7">
            <div className="aboutus-text">
              <h3>About <span>{blog.title}</span></h3>
              <p>{blog.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
