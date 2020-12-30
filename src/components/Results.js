import './Home.css';
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar.js'
import { Link } from 'react-router-dom';

function Results(props) {
    
    return(
        <div className="Home">
            <Navbar />
            <div className="Loading"></div>
        </div>
    );
}


export default Results;