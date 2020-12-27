import './Frame.css';
import React from 'react';

function Frame(props){
    return <div className = "container"> 
        <img className = "image" src ={props.image} alt = {props.name}></img>
        <div className = "title">
            {props.name}
        </div>
        <div className = "year">
            {props.year}
        </div>
    </div>
}

export default Frame;