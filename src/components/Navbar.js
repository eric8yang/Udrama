import './Navbar.css';
import React from 'react';
//import searchIcon from '../images/searchIcon.png';
import logo from '../images/logo.png'


function NavBar(props) {
    /*<div className = "searchContainer">
                    <img className = "searchIcon" src ={searchIcon} alt="searchIcon"></img>
                </div>
    */
    
    return (
        <div>
            <div className="topBar">
                
                <img className="logo" src={logo} alt="Udrama logo"></img>
            </div>
            <div className="bottomBar"></div>
        </div>
    )
}

export default NavBar;