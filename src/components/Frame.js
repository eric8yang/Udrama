import './Frame.css';
import React from 'react';

function Frame(props){
    return <div className = "container"> 
        <div className = "imageViewer">
            <img className = "image" src ={props.image} alt = {props.name}>
            </img>
            <div className = "rate">
                <div className = "stars"></div>
            </div>
        </div>
        <div className = "title">
            {props.name}
        </div>
        <div className = "year">
            {props.year}
        </div>
    </div>
}

export default Frame;