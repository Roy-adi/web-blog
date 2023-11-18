import React, { useState } from 'react';
import './Menu.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';
import SearchModal from './SearchModal';
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext/AuthContext";
import { removeToken } from "../Constants/Helpers";


const Menu = () => {

   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };


  const { user } = useAuthContext();
      const navigate = useNavigate();
    
      const handleLogout = () => {
        removeToken();
        navigate("/", { replace: true });
      };
  


  return (
    <>


   <nav
   className="navbar navbar-expand-md navbar-dark"
   style={{ backgroundColor: "#595B83" }}
 >
   <div className="container-fluid">
     <a className="navbar-brand" href="#">
       <h2 className='blog-name'>Ray-Blogs</h2>
     </a>
     <button
       className="navbar-toggler"
       type="button"
       data-bs-toggle="collapse"
       data-bs-target="#navbarNav"
       aria-controls="navbarNav"
       aria-expanded="false"
       aria-label="Toggle navigation"
     >
       <span className="navbar-toggler-icon" />
     </button>
     <div className="collapse navbar-collapse" id="navbarNav">
       <ul className="navbar-nav mx-auto">
         <li className="nav-item">
           <Link to='/' className="nav-link active" aria-current="page" href="#">
             Home
           </Link>
         </li>
         <li className="nav-item">
         <Link to='/about' className="nav-link active" aria-current="page" href="#">
           About Us
         </Link>
       </li>
         <li className="nav-item">
           <Link to="/categogy" className="nav-link" href="#">
             Category
           </Link>
         </li>
         <li className="nav-item" onClick={openSearchModal} >
           <a className="nav-link">Search </a>
         </li>
         <li className="nav-item">
           <Link to='/contact' className="nav-link">Contact</Link>
         </li>

         <div className='d-flex'> 
         {user ? (
          <>
            <li className="nav-item dropdown" >
              <Link className='nav-link' to= '/profile'> Hello { "😊 " } {user.username} </Link>
            </li>

           <li className="nav-item" >
              <Button className='nav-link' onClick={handleLogout}> Logout </Button>
            </li>
          </>
        ) : (
          <>
          <li className="nav-item" >
          <Link className='nav-link' to= '/signin'> Login </Link>
          </li>
          <li className="nav-item" >
          <Link className='nav-link' to= '/signup'> Signup </Link>
          </li>
          </>
        )} 
         </div>
       

       </ul>
     </div>
   </div>
   <SearchModal isOpen={isSearchModalOpen} onRequestClose={closeSearchModal} />
 </nav>
 </>
  )
}

export default Menu