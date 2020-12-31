import './Display.css';
import React from 'react';

import sample1 from '../images_h/Crash Landing On You_h.jpg';
import sample2 from '../images_h/Itaewon Class_h.jpg';
import sample3 from '../images_h/Strong Woman Do Bong Soon_h.jpg';
import sample4 from '../images_h/Mr. Sunshine_h.jpg';

function Display() {

    return (
        <div className="mainContainer">
            <img className="mainBackground" src={sample4}></img>
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
                <button className="homeButton">HOME - DRAMAS</button>
                <div className="listContainer">
                    <div className="dramaFrame">
                        <img className="dramaImage" src={sample1}></img>
                        <div className="selector"></div>
                    </div>
                    <div className="dramaFrame">
                        <img className="dramaImage" src={sample2}></img>
                        <div className="selector"></div>
                    </div>
                    <div className="dramaFrame">
                        <img className="dramaImage" src={sample3}></img>
                        <div className="selector"></div>
                    </div>
                    <div className="dramaFrame">
                        <img className="dramaImage" src={sample4}></img>
                        <div className="selector"></div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Display;