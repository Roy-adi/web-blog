import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Subcategories.css";
import {
  Alert,
  message,
 
} from "antd";
import {
  fetchDataFromApi,
  sendDataFromApi,
  editDataFromApi,
  deleteDataFromApi,
} from "../../Utils/api";
import { Base_url } from "../../Utils/api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext/AuthContext";

const SubCategories = () => {
 
  const { id } = useParams();
  const fileRef = useRef();
  const [blogs, setBlogs] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    
  });
  const [editedBlogId, setEditedBlogId] = useState(null); // Track the edited blog ID
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    fetchDataFromApi(`/api/subcategories/${id}?populate=blogs.img`)
      .then((res) => {
        console.log("API response:", res);
        setBlogs(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

  const handleEditClick = (blogId) => {
    // Find the blog item by its ID
    const editedBlog = blogItems.find((item) => item.id === blogId);
    if (editedBlog) {
      // Populate the form fields with the blog data
      setFormData({
        title: editedBlog.attributes.title,
        desc: editedBlog.attributes.desc,
      });
      // Track the edited blog ID
      setEditedBlogId(blogId);
    }
  };

  const handleSaveChanges = async () => {
    if (!editedBlogId) {
      return; // No blog is being edited
    }

    try {
      // Create an object with the updated data
      const dataToSend = {
        title: formData.title,
        desc: formData.desc,
      };

      // Make a PUT request using the editDataFromApi function to update the blog
      const response = await editDataFromApi(`/api/blogs/${editedBlogId}`, {
        data: dataToSend,
      });

      // Handle the response (you can show a success message or redirect the user)
      console.log("Blog data updated successfully:", response);

      // Clear the form fields and reset the edited blog ID
      setFormData({
        title: "",
        desc: "",
      });
      setEditedBlogId(null);

      // Refresh the blog list after updating
      getBlogs();
    } catch (error) {
      // Handle any errors (you can show an error message to the user)
      console.error("Error updating blog data:", error);
    }
  };

  const handleDelete = async (blogId) => {
    if (!blogId) {
      return; // No blog is selected for deletion
    }

    try {
      // Make a DELETE request using the deleteDataFromApi function to delete the blog
      const response = await deleteDataFromApi(`/api/blogs/${blogId}`);

      // Handle the response (you can show a success message or refresh the blog list)
      console.log("Blog deleted successfully:", response);

      // Refresh the blog list after deletion
      getBlogs();
    } catch (error) {
      // Handle any errors (you can show an error message to the user)
      console.error("Error deleting blog:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create an object with the same structure as the example from Strapi documentation
      const dataToSend = {
        title: formData.title,
        desc: formData.desc,
        subcategory: id, // Include the subcategory ID in the data
        Name: user?.name,
      };

      const blogFormData = new FormData();
      blogFormData.append("data", JSON.stringify(dataToSend));
      blogFormData.append("files.img", fileRef.current.files[0]);

      // Make a POST request using the sendDataFromApi function to the modified endpoint
      const response = await sendDataFromApi(`/api/blogs`, blogFormData);
      message.success(`Blog Added`);
      // Handle the response (you can show a success message or redirect the user)
      console.log("Blog data sent successfully:", response);
     

      // Refresh the blog list after posting
      getBlogs();
    } catch (error) {
      // Handle any errors (you can show an error message to the user)
      console.error("Error sending blog data:", error);
    }
  };

  if (blogs === null) {
    return <div>Loading...</div>;
  }

  const blogData = blogs.data;
  const blogItems = blogData?.attributes?.blogs?.data || [];
 
 

    // Split the description into words
    // const words = description.split(' ');

    // // Determine whether to show "Read more" text
    // const showReadMore = words.length > 20;

  const defaultImgUrl =
    "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vdGJhbGx8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60";

  console.log("Base_url:", Base_url);
  console.log("defaultImgUrl:", defaultImgUrl);
  

  return (
    <div className="container">
      <div className="row">
        {blogItems.map((item) => (
          <div key={item.id} className="col-md-6 blog">
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
                  {item?.attributes?.createdAt} ·{" "}
                  <span className="card__time-to-read">
                    {item?.attributes?.Name}
                  </span>
                </div>
                <div className="card__excerpt">{item?.attributes?.desc}</div>
              </div>
              {/* Render the "Edit" and "Delete" buttons with click handlers */}
              {item?.attributes?.Name === user?.name && (
                <div>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
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
              onSubmit={editedBlogId ? handleSaveChanges : handleSubmit}
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
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">Blog Image</label>
                    <input
                      type="file"
                      name="img"
                      accept="image/*"
                      ref={fileRef}
                    />
                  </div>
                </div>
              </div>
              {/* Render "Save changes" button when editing */}
              {editedBlogId ? (
                <button className="btn-send" type="submit">
                  Save Changes
                </button>
              ) : (
                <button className="btn-send" type="submit">
                  Send message
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
