import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext/AuthContext';
import { removeToken } from '../Constants/Helpers';
import { Button, Space } from "antd";
import { Link } from 'react-router-dom';
const Menu = () => {
  
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" >
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to='/' className="nav-link active" aria-current="page" >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" >
              About
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item" >
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" >
                  Another action
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" >
                  Something else here
                </a>
              </li>
            </ul>
          </li>
          <div className='d-flex'> 
          {user ? (
           <>
             <li className="nav-item" >
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
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
  
  
  )
}

export default Menu
