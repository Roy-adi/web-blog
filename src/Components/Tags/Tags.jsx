import React from 'react';
import './Tags.css'

import { Base_url } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
const Tags = ({tags}) => {

    const navigate = useNavigate();

    if (!tags) {
        // Handle the case where blog is null or undefined
        return null; // Or you can render a placeholder or an error message
      }

    //   console.log(tags,'tt');

      const imgData = tags.attributes?.img?.data?.attributes?.url || '';
      const title = tags.attributes?.title || 'Title Goes Here';

  return (
    <section className="tags" aria-labelledby="tag-label">
      <div className="container">
        <h2 className="headline headline-2 section-title" id="tag-label">
          <span className="span">Popular Tags</span>
        </h2>
        <p className="section-text">Most searched keywords</p>
        <ul className="list-unstyled row">
          {
            tags.data.map((tag,index)=>(
                <li className="col-6 col-md-4 col-lg-3 mb-4" key={tag.id}  >
                <button className="card tag-btn"  onClick={() => navigate(`/subcategry/${tag.id}`)}>
                  <img src= {Base_url+ tag.attributes?.img?.data[0]?.attributes?.url || ''}  alt="Travel" />
                  <p className="btn-text"> { tag.attributes.title } </p>
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
};

export default Tags;
