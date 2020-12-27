import './Searchbar.css';
import React from 'react';
import searchIcon from '../images/searchIcon.png';
import logo from '../images/logo.png'


function Searchbar(props){
    return (
    <div className = "bar"> 
        <div className = "searchContainer">
            <img className = "searchIcon" src ={searchIcon} alt="searchIcon"></img>
            <input className = "searchBox" type="text" placeholder="Search..."></input>
        </div>
        
        <img className = "logo" src ={logo}></img>
        
    </div>)
}

export default Searchbar;