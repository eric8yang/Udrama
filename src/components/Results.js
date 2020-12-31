import './Home.css';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.js';
import Display from './Display.js';
import { Link } from 'react-router-dom';

function Results(props) {
    /*
    <div className="Home">
            <Navbar />
            <div className="Loading"></div>
        </div>
        */
    return(
        <div className="Home">
            <Display />
        </div>   
    );
}


export default Results;