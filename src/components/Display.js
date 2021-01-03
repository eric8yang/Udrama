import './Display.css';
import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../images_h/udramalogo.png';


const fetchResults = () => {
    let dramaRecs = sessionStorage.getItem("recs").split(",");

    let formattedDramas = new Array(4);
    for (let i = 0; i < 4; i++) {
        var dramaName = dramaRecs[i];
        var dramaActors = sessionStorage.getItem(dramaName + " actors");
        var dramaInfo = sessionStorage.getItem(dramaName + " info");
        formattedDramas[i] = [dramaName, dramaActors, dramaInfo];
    }
    return formattedDramas;
}

const updatePage = (numDrama, dramaData) => {
    
    let currDramaNum = document.getElementById("ratingNumber").innerHTML.charAt(1);
    if (currDramaNum !== numDrama) {
        let [name, actors, synopsis] = dramaData[numDrama - 1];
        document.getElementById("mainBackground").src =require('../images_h/' + name + "_h.jpg").default;
        document.getElementById("ratingNumber").innerHTML = "#" + numDrama;
        document.getElementById("mainDramaTitle").innerHTML = name;
        document.getElementById("dramaActors").innerHTML = actors;
        document.getElementById("dramaSynopsis").innerHTML = synopsis;
        document.getElementById("")
        for (let i = 1; i <= 4; i++){
            let selector = document.getElementById("dramaSelector" + i);
            if (selector.classList.contains("selected") && i !== numDrama){
                selector.classList.remove("selected");
            }
            else if (!selector.classList.contains("selected") && i === numDrama){
                selector.classList.add("selected");
            }
        }
    }

}

function Display() {
    let dramaRecs = fetchResults();
    return (
        <div className="mainContainer">
            <img id="mainBackground" className="mainBackground" src={require('../images_h/' + dramaRecs[0][0] + '_h.jpg').default} alt="dramaBackground"/>
            <Link to="/">
                <img className="logo" src={logo} alt="UDrama Logo"/>
            </Link>

            <div className="leftContainer">
                <div className="titleRectangle"/>
                <div className="ratingCircle">
                    <p id="ratingNumber">#1</p>
                </div>
                <div className="bestMatch">BEST MATCH</div>
                <div className="titleContainer">
                    <p id="mainDramaTitle">{dramaRecs[0][0]}</p>
                </div>
                <div className="textContainer">
                    <p className="actors" id="dramaActors">{dramaRecs[0][1]}</p>
                    <p className="synopsis" id="dramaSynopsis">{dramaRecs[0][2]}</p>
                </div>

                <div className="buttonContainer">
                    <button>netflix</button>
                    <button>dramacool</button>
                    <button>viki</button>
                </div>
            </div>
            <div className="rightContainer">
                <Link to="/">
                    <button className="homeButton">HOME - DRAMAS</button>
                </Link>
                <div className="listContainer">
                    <div className="dramaFrame">
                        <img id="dramaImage1" className="dramaImage" src={require('../images_h/' + dramaRecs[0][0] + '_h.jpg').default} alt="firstRec"/>
                        <button id="dramaSelector1" className="selector selected" onClick={() => updatePage(1, dramaRecs)}>
                            <div className="selectorRectangle"/>
                        </button>
                        <div className="imageTitleBackground">
                            <p id="dramaTitle1" className="imageTitle">{dramaRecs[0][0].toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="dramaFrame">
                        <img id="dramaImage2" className="dramaImage" src={require('../images_h/' + dramaRecs[1][0] + '_h.jpg').default} alt="secondRec"/>
                        <button id="dramaSelector2" className="selector" onClick={() => updatePage(2, dramaRecs)}>
                            <div className="selectorRectangle"/>
                        </button>
                        <div className="imageTitleBackground">
                            <p id="dramaTitle2" className="imageTitle">{dramaRecs[1][0].toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="dramaFrame">
                        <img id="dramaImage3" className="dramaImage" src={require('../images_h/' + dramaRecs[2][0] + '_h.jpg').default} alt="thirdRec"></img>
                        <button id="dramaSelector3" className="selector" onClick={() => updatePage(3, dramaRecs)}>
                            <div className="selectorRectangle"/>
                        </button>
                        <div className="imageTitleBackground">
                            <p id="dramaTitle3" className="imageTitle">{dramaRecs[2][0].toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="dramaFrame">
                        <img id="dramaImage4" className="dramaImage" src={require('../images_h/' + dramaRecs[3][0] + '_h.jpg').default} alt="fourthRec"></img>
                        <button id="dramaSelector4" className="selector" onClick={() => updatePage(4, dramaRecs)}>
                            <div className="selectorRectangle"/>
                        </button>
                        <div className="imageTitleBackground">
                            <p id="dramaTitle4" className="imageTitle">{dramaRecs[3][0].toUpperCase()}</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Display;