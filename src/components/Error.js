import './Error.css';
import React from 'react';
//import searchIcon from '../images/searchIcon.png';
import logo from '../images_h/udramalogo.png'
import { Link } from 'react-router-dom';


function Error(props) {
    /*<div className = "searchContainer">
                    <img className = "searchIcon" src ={searchIcon} alt="searchIcon"></img>
                </div>
    */

    return (
        <div>
            <div className="topContainer">
                <img className="errorPageLogo" src={logo}></img>
                <div className="middleContainer">
                    <p className="errorMessage">404 error.</p>
                    <p className="backgroundNumbers">40404</p>
                    <p className="errorBody">The page you are looking for cannot be found. Click the button below to redirect or email us at the address below with any inquiries. </p>
                    <Link to="/">
                        <button className="buttonHome">HOME</button>
                    </Link>
                </div>

            </div>

            <div className="bottomContainer">
                <div className="rectangle"></div>
                <p className="email">Questions? Email us at</p>
                <p className="emailName">eric8yang@gmail.com or katherinewang2001@gmail.com</p>
                <p className="aboutHeader">WHAT IS UDRAMA?</p>
                <p className="aboutText">UDrama is a personalized korean drama site that provides recommendations exclusive to its users preferences. Browse through our extensive selection, rate the ones you’ve viewed before, and view our recommendations. UDrama allows you to gauge whether or not you are truly interested in the respective recommendations by providing the lead actors and summarized descriptions of each drama. Then, consider the available viewing platforms and play with a single click! </p>


            </div>

        </div>

    )
}

export default Error;