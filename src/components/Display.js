import './Display.css';
import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../images_h/udramalogo.png';

const fetchResults = () => {
    let dramaRecs = sessionStorage.getItem("recs").split(","); //gets all the drama names

    let formattedDramas = new Array(4); //makes new array which ends up being 4x4
    for (let i = 0; i < 4; i++) {
        var dramaName = dramaRecs[i]; //first element is name of drama
        var dramaActors = sessionStorage.getItem(dramaName + " actors"); //second element is actors in drama
        var dramaInfo = sessionStorage.getItem(dramaName + " info"); //third element is info on drama
        formattedDramas[i] = [dramaName, dramaActors, dramaInfo];
    }
    return formattedDramas;
}

const fetchLinks = resultNames => { //pass in list of full drama data
    let linksMap = new Map();
    if (resultNames !== null){
        for (let i = 0; i < 4; i++){
            var dramaName = resultNames[i][0];
            var linksArray = sessionStorage.getItem(dramaName + "links");
            linksMap.set(dramaName, linksArray);
        }
    }
    return linksMap;
}

const updatePage = (numDrama, dramaData, linksMap) => {
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
        
        var linksArray = linksMap.get(name).split(",");
        var length = linksArray.length;
        if (length === 2){
            let button1 = document.getElementById("button1");
            button1.className = linksArray[0];
            button1.onclick = () => redirect(linksArray[1]);
            let image1 = document.getElementById("buttonImage1");
            image1.className = linksArray[0] + "Image";
            image1.src = require('../button/' + linksArray[0] + '.png').default;

            let button2 = document.getElementById("button2");
            button2.className = "transparent";
            let image2 = document.getElementById("buttonImage2");
            image2.className = "transparent";

            let button3 = document.getElementById("button3");
            button3.className = "transparent";
            let image3 = document.getElementById("buttonImage3");
            image3.className = "transparent";
        }

        if (length === 4){
            let button1 = document.getElementById("button1");
            button1.className = linksArray[0];
            button1.onclick = () => redirect(linksArray[1]);
            let image1 = document.getElementById("buttonImage1");
            image1.className = linksArray[0] + "Image";
            image1.src = require('../button/' + linksArray[0] + '.png').default;

            let button2 = document.getElementById("button2");
            button2.className = linksArray[2];
            button2.onclick = () => redirect(linksArray[3]);
            let image2 = document.getElementById("buttonImage2");
            image2.className = linksArray[2] + "Image";
            image2.src = require('../button/' + linksArray[2] + '.png').default;

            let button3 = document.getElementById("button3");
            button3.className = "transparent";
            let image3 = document.getElementById("buttonImage3");
            image3.className = "transparent";
        }

        if (length === 6){
            let button1 = document.getElementById("button1");
            button1.className = linksArray[0];
            button1.onclick = () => redirect(linksArray[1]);
            let image1 = document.getElementById("buttonImage1");
            image1.className = linksArray[0] + "Image";
            image1.src = require('../button/' + linksArray[0] + '.png').default;

            let button2 = document.getElementById("button2");
            button2.className = linksArray[2];
            button2.onclick = () => redirect(linksArray[3]);
            let image2 = document.getElementById("buttonImage2");
            image2.className = linksArray[2] + "Image";
            image2.src = require('../button/' + linksArray[2] + '.png').default;

            let button3 = document.getElementById("button3");
            button3.className = linksArray[4];
            button3.onclick = () => redirect(linksArray[5]);
            let image3 = document.getElementById("buttonImage3");
            image3.className = linksArray[4] + "Image";
            image3.src = require('../button/' + linksArray[4] + '.png').default;
        }
    }
}

const redirect = (link) => {
    window.open(link)
}

const getButtons = (name, linksMap) => {
    var linksArray = linksMap.get(name).split(",");
    var length = linksArray.length;
    if (length === 2){
        return(<div id="buttonContainer" className="buttonContainer">
        <button id="button1" className={linksArray[0]} onClick={() => redirect(linksArray[1])}>
            <img id="buttonImage1" className={linksArray[0]+ "Image"}  src={require('../button/' + linksArray[0] + '.png').default} alt="firstButton"></img>
        </button>
        <button id="button2" className="transparent" onClick={() => redirect(linksArray[3])}>
            <img id="buttonImage2" className="transparent"  src="" alt="secondButton"></img>
        </button>
        <button id="button3" className="transparent" onClick={() => redirect(linksArray[5])}>
            <img id="buttonImage3" className="transparent"   src="" alt="thirdButton"></img>
        </button>
        </div>)
    }

    if (length === 4){
        return(<div id="buttonContainer" className="buttonContainer">
        <button id="button1" className={linksArray[0]} onClick={() => redirect(linksArray[1])}>
            <img id="buttonImage1" className={linksArray[0]+ "Image"}  src={require('../button/' + linksArray[0] + '.png').default} alt="firstButton"></img>
        </button>
        <button id="button2" className={linksArray[2]} onClick={() => redirect(linksArray[3])}>
            <img id="buttonImage2" className={linksArray[2]+ "Image"}  src={require('../button/' + linksArray[2] + '.png').default} alt="secondButton"></img>
        </button>
        <button id="button3" className="transparent" onClick={() => redirect(linksArray[5])}>
            <img id="buttonImage3" className="transparent"   src="" alt="thirdButton"></img>
        </button>
        </div>)
    }

    else{
        return(<div id="buttonContainer" className="buttonContainer">
        <button id="button1" className={linksArray[0]} onClick={() => redirect(linksArray[1])}>
            <img id="buttonImage1" className={linksArray[0]+ "Image"}  src={require('../button/' + linksArray[0] + '.png').default} alt="firstButton"></img>
        </button>
        <button id="button2" className={linksArray[2]} onClick={() => redirect(linksArray[3])}>
            <img id="buttonImage2" className={linksArray[2]+ "Image"}  src={require('../button/' + linksArray[2] + '.png').default} alt="firstButton"></img>
        </button>
        <button id="button3" className={linksArray[4]} onClick={() => redirect(linksArray[5])}>
            <img id="buttonImage3" className={linksArray[4]+ "Image"}  src={require('../button/' + linksArray[4] + '.png').default} alt="thirdButton"></img>
        </button>
        </div>)
    }
}


function Display() {
    let dramaRecs = fetchResults();
    let linkData = fetchLinks(dramaRecs);
    var buttonContainer = getButtons(dramaRecs[0][0], linkData);
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
                {buttonContainer}
                
            </div>
            <div className="rightContainer">
                <Link to="/">
                    <button className="homeButton">HOME - DRAMAS</button>
                </Link>
                <div className="listContainer">
                    <div className="dramaFrame">
                        <img id="dramaImage1" className="dramaImage" src={require('../images_h/' + dramaRecs[0][0] + '_h.jpg').default} alt="firstRec"/>
                        <button id="dramaSelector1" className="selector selected" onClick={() => updatePage(1, dramaRecs, linkData)}>
                            <div className="selectorRectangle"/>
                        </button>
                        <div className="imageTitleBackground">
                            <p id="dramaTitle1" className="imageTitle">{dramaRecs[0][0].toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="dramaFrame">
                        <img id="dramaImage2" className="dramaImage" src={require('../images_h/' + dramaRecs[1][0] + '_h.jpg').default} alt="secondRec"/>
                        <button id="dramaSelector2" className="selector" onClick={() => updatePage(2, dramaRecs, linkData)}>
                            <div className="selectorRectangle"/>
                        </button>
                        <div className="imageTitleBackground">
                            <p id="dramaTitle2" className="imageTitle">{dramaRecs[1][0].toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="dramaFrame">
                        <img id="dramaImage3" className="dramaImage" src={require('../images_h/' + dramaRecs[2][0] + '_h.jpg').default} alt="thirdRec"></img>
                        <button id="dramaSelector3" className="selector" onClick={() => updatePage(3, dramaRecs, linkData)}>
                            <div className="selectorRectangle"/>
                        </button>
                        <div className="imageTitleBackground">
                            <p id="dramaTitle3" className="imageTitle">{dramaRecs[2][0].toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="dramaFrame">
                        <img id="dramaImage4" className="dramaImage" src={require('../images_h/' + dramaRecs[3][0] + '_h.jpg').default} alt="fourthRec"></img>
                        <button id="dramaSelector4" className="selector" onClick={() => updatePage(4, dramaRecs, linkData)}>
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