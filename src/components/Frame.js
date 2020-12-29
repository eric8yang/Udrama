import './Frame.css';
import React from 'react';
import grayStar from '../images/starGray.png';
import yellowStar from '../images/starYellow.png';



function Frame(props){
    const lightUpStars = (starNumber, name) => {
        for (let i = 1; i <= 5; i++){
            var elem = document.getElementById("star" + i + name);
            elem.classList.remove("yellowStar");
            elem.classList.remove("grayStar");
        }

        for (let i = 1; i <= 5; i++){
            if (i <= starNumber) {
                var elem = document.getElementById("star" + i + name);   
                elem.classList.add("yellowStar");
            }
            else {
                var elem = document.getElementById("star" + i + name);
                elem.classList.add("grayStar");
            }
        }

        var rateElem = document.getElementById("rate" + name);
        rateElem.classList.add("rateStatic");
    }

    return <div className = "container"> 
        <div className = "imageViewer">
            <img className = "image" src ={props.image} alt = {props.name}>
            </img>
            <div className = "rate" id = {"rate" + props.name}>
                <div className = "starContainer">
                    <button className = "star" id = {"star1" + props.name} onClick = {() => lightUpStars("1", props.name)}/>
                    <button className = "star" id = {"star2" + props.name} onClick = {() => lightUpStars("2", props.name)}/>
                    <button className = "star" id = {"star3" + props.name} onClick = {() => lightUpStars("3", props.name)}/>
                    <button className = "star" id = {"star4" + props.name} onClick = {() => lightUpStars("4", props.name)}/>
                    <button className = "star" id = {"star5" + props.name} onClick = {() => lightUpStars("5", props.name)}/>
                </div> 
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