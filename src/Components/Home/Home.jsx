import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../Banner/Banner';
import BlogCard from '../Blogs/BlogCard';
import Tags from '../Tags/Tags';
import { fetchDataFromApi } from '../../Utils/api';
import { myContext} from '../../Utils/Context';
import Footer from '../Footer/Footer';
import News from '../News/News';

const Home = () => {
  const navigate = useNavigate();
  const { categories, setCategories, blogs, setBlogs, tags, setTags } = useContext(myContext);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [numToShow, setNumToShow] = useState(3);
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  useEffect(() => {
    getCategories();
    getBlogs();
    getTags();
  }, []);

  useEffect(() => {
    // Update displayedBlogs when blogs change
    if (blogs && blogs.data) {
      setDisplayedBlogs(blogs.data.slice(0, showAllBlogs ? blogs.data.length : numToShow));
    }
  }, [blogs, numToShow, showAllBlogs]);

  const getCategories = () => {
    fetchDataFromApi("/api/categories?populate=*").then((res) => {
      setCategories(res);
    });
  };

  const getTags = () => {
    fetchDataFromApi("/api/subcategories?populate=*").then((res) => {
      setTags(res);
    });
  };

  const getBlogs = () => {
    fetchDataFromApi("/api/blogs?populate=*").then((res) => {
      setBlogs(res);
    });
  };

  const loadMore = () => {
    setNumToShow(numToShow + 3);
    setShowAllBlogs(true);
  };

  const showLess = () => {
    setNumToShow(3);
    setShowAllBlogs(false);
  };

  return (
    <div>
      <Banner categories={categories} />
      <Tags tags={tags} />
      <div className="container">
        <div className="row">
          <h4 className="blog-titles">
            Popular Blogs <span className="d-block"> Most Popular Blogs </span>
          </h4>
          {displayedBlogs.map((blog, index) => (
            <div className="col-md-4 blog-cards" key={blog.id} onClick={() => navigate(`/blogs/${blog.id}`)}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
        {numToShow < (blogs?.data?.length || 0) && !showAllBlogs && (
          <button onClick={loadMore}>More</button>
        )}
        {showAllBlogs && (
          <button onClick={showLess}>Less</button>
        )}
      </div>
      <News/>
     
    </div>
  );
};

export default Home;
