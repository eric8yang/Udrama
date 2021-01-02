import './Display.css';
import React from 'react';
import {Link} from 'react-router-dom'

import sample1 from '../images_h/Crash Landing On You_h.jpg';
import sample2 from '../images_h/Itaewon Class_h.jpg';
import sample3 from '../images_h/Strong Woman Do Bong Soon_h.jpg';
import sample4 from '../images_h/Mr. Sunshine_h.jpg';
import logo from '../images_h/udramalogo.png';

function Display() {

    return (
        <div className="mainContainer">
            <img className="mainBackground" src={sample4}></img>
            <img className="logo" src={logo}></img>
            <div className="leftContainer">
                <div className = "titleRectangle"></div>
                <div className="ratingCircle">
                    <p>#4</p>
                </div>
                <div className="bestMatch">BEST MATCH</div>
                <div className="titleContainer">
                    <p>Strong Woman Do Bong Soon</p>
                </div>
                <div className="textContainer">
                    <p className="actors">Lee Byung-hun, Kim Tae-ri, Yoo Yeon-seok, Kim Min-jung, Byun Yo-han</p>
                    <p className="synopsis">A Korean boy from a poor family who ends up in the United States after the 1871 Shinmiyangyo incident returns to his homeland during a historical turning point. Now an officer with the American military, Eugene falls in love with Ae-sin, an aristocrat's daughter, and discovers a dark scheme to colonize the country from which he once fled. Ae-sin tries to figure out if Eugene is a friend as they wonders what the English word "love" means.</p>
                </div>

                <div className="buttonContainer">
                    <button className="leftButton">netflix</button>
                    <button className="middleButton">dramacool</button>
                    <button className="rightButton">viki</button>
                </div>
            </div>
            <div className="rightContainer">
                <Link to="/">
                    <button className="homeButton">HOME - DRAMAS</button>
                </Link>
                <div className="listContainer">
                    <div className="dramaFrame">
                        <img className="dramaImage" src={sample1}></img>
                        <div className="selector">
                            <div className="selectorRectangle"></div>
                        </div>
                        <div className="imageTitleBackground">
                            <p className="imageTitle">CRASH LANDING ON YOU</p>
                        </div>
                    </div>
                    <div className="dramaFrame">
                        <img className="dramaImage" src={sample2}></img>
                        <div className="selector">
                            <div className="selectorRectangle"></div>
                        </div>
                        <div className="imageTitleBackground">
                            <p className="imageTitle">ITAEWON CLASS</p>
                        </div>
                    </div>
                    <div className="dramaFrame">
                        <img className="dramaImage" src={sample3}></img>
                        <div className="selector">
                            <div className="selectorRectangle selected"></div>
                        </div>
                        <div className="imageTitleBackground">
                            <p className="imageTitle">STRONG WOMAN DO BONG SOON</p>
                        </div>
                    </div>
                    <div className="dramaFrame">
                        <img className="dramaImage" src={sample4}></img>
                        
                        <div className="selector selected">
                            <div className="selectorRectangle"></div>
                        </div>
                        <div className="imageTitleBackground">
                            <p className="imageTitle">MR. SUNSHINE</p>
                        </div>       
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Display;