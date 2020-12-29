import './Navbar.css';
import React from 'react';
import searchIcon from '../images/searchIcon.png';
import logo from '../images/logo.png'


function Searchbar(props) {
    /*<div className = "searchContainer">
            <img className = "searchIcon" src ={searchIcon} alt="searchIcon"></img>
            <input className = "searchBox" type="text" placeholder="Search..."></input>
        </div>
    */
    return (
        <div>
            <div className="topBar">
                <img className="logo" src={logo}></img>
            </div>
            <div className="bottomBar"></div>
        </div>
    )
}

export default Searchbar;