import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Subcategories.css';
import { fetchDataFromApi, sendDataFromApi } from '../../Utils/api';
import { Base_url } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext/AuthContext';
import axios from 'axios';

const AddBlog = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
  });
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    fetchDataFromApi(`/api/subcategories/${id}?populate=blogs.img`)
      .then((res) => {
        console.log('API response:', res);
        setBlogs(res);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setBlogs(null);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const submitData = async (data, event) => {
    event.preventDefault();
    try {
      // Create an object with the blog data
      const dataToSend = {
        title: data.title,
        desc: data.desc,
        subcategory: id,
        Name: user?.name,
      };

      // Make a POST request using the sendDataFromApi function to the modified endpoint
      const response = await sendDataFromApi(`/api/blogs`, { data: dataToSend });

      // Handle the response (you can show a success message or redirect the user)
      console.log('Blog data sent successfully:', response);

      // Upload the image
      const formData = new FormData();
      formData.append('files', data.file);
      formData.append('ref', 'blog');
      formData.append('refId', response.id);
      formData.append('field', 'img');

      await axios({
        method: 'POST',
        url: `http://localhost:1337/upload`,
        data: formData,
      });

      // Clear the form fields
      setFormData({
        title: '',
        desc: '',
      });

      // Refresh the blog list after posting
      getBlogs();
    } catch (error) {
      // Handle any errors (you can show an error message to the user)
      console.error('Error sending blog data:', error);
    }
  };

  if (blogs === null) {
    return <div>Loading...</div>;
  }

  const blogData = blogs.data;
  const blogItems = blogData?.attributes?.blogs?.data || [];

  const defaultImgUrl =
    'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vdGJhbGx8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60';

  return (
    <div className='container'>
      <div className='row'>
        {blogItems.map((item) => (
          <div key={item.id} className='col-md-6 blog'>
            <article className="horizontal card">
              <img
                className="card__img"
                src={
                  item.attributes.img.data
                    ? Base_url + item.attributes.img.data?.attributes?.url
                    : defaultImgUrl
                }
                alt={item?.attributes?.title}
              />
              <div className="card__content">
                <div className="card__type">article</div>
                <div className="card__title">{item?.attributes?.title}</div>
                <div className="card__date">
                  {item?.attributes?.createdAt} ·{' '}
                  <span className="card__time-to-read">
                    {item?.attributes?.Name}
                  </span>
                </div>
                <div className="card__excerpt">
                  {item?.attributes?.desc}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="left-contact">
            <h2 className="contact-title">
              <span>Send Us</span> Message
            </h2>
            <form
              className="rd-mailform"
              onSubmit={submitData}
            >
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Blog Title</label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">Blog</label>
                    <textarea
                      className="form-control"
                      name="desc"
                      value={formData.desc}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">Blog Image</label>
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <button className="btn-send" type="submit">
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
