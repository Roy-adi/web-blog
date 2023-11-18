import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './SearchModal.css';
import useFetch from '../../Utils/Hooks';
import { Base_url } from '../../Utils/api';
import { useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';

Modal.setAppElement('#root'); // Define the app element outside the component, once in your app setup.

const SearchModal = ({ isOpen, onRequestClose }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    
    const onChange = (e) => {
        setQuery(e.target.value);
    };

    let { data } = useFetch(
        `/api/blogs?populate=*&filters[title][$contains]=${query}`
    );

    if (!query.length || !data || !Array.isArray(data.data)) {
        data = { data: [] };
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Search Modal"
            className="search-modal"
            overlayClassName="search-modal-overlay"
        >
        <FaTimes className="close-icon" onClick={onRequestClose} />
            <div className="search-container">
             <h5 className='search-text'> search for your favourite Blogs..</h5>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={onChange}
                />
            </div>
            <div className="search-results">
                {data.data.slice(0,4).map((item) => (
                    <div
                        className="search-result-item"
                        key={item.id}
                        onClick={() => {
                            navigate("/blogs/" + item.id);
                            onRequestClose()
                        }}
                    >
                        <div className="result-image">
                            {item.attributes.img && item.attributes.img.data && item.attributes.img.data[0] && (
                                <img
                                    src={Base_url+item.attributes.img.data[0].attributes
                                        .url}
                                    alt={item.attributes.title}
                                />
                            )}
                        </div>
                        <div className="prod-details">
                            <span className="name">
                                {item.attributes.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default SearchModal;
