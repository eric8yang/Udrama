import './Home.css';
import Frame from './Frame.js'
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar.js'
import { Link } from 'react-router-dom';

const useFetchDramas = url => {
    const [data, setData] = useState(null);
    useEffect(() => {
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var arrayWithValues = xhttp.responseText.trim().split('\t')

                var betterArray = new Array(250)
                var currIndex = 0;
                for (let i = 0; i < 193; i++) {
                    var currString = arrayWithValues[i];
                    var index = currString.indexOf("\n")
                    if (index !== -1) {
                        var firstPart = currString.substring(0, index);
                        var secondPart = currString.substring(index + 1);
                        betterArray[currIndex] = firstPart;
                        currIndex++;
                        betterArray[currIndex] = secondPart;
                    }
                    else {
                        betterArray[currIndex] = arrayWithValues[i];
                    }
                    currIndex++;
                }

                let spreadsheet = new Array(48)
                for (let i = 0; i < 48; i++) {
                    var currRow = new Array(5);
                    for (let j = 0; j < 5; j++) {
                        currRow[j] = betterArray[i * 5 + j];
                    }
                    spreadsheet[i] = currRow;
                }

                let newData = new Array(8);
                for (let i = 0; i < 8; i++) {
                    var row = new Array(6);
                    for (let j = 0; j < 6; j++) {
                        row[j] = spreadsheet[i * 6 + j];
                    }
                    newData[i] = row;
                }
                setData(newData);
                console.log("data set")
            };
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }, [url]);

    return data;
}

const useFetchLinks = url => {
    const [linkData, setLinkData] = useState(null);
    useEffect(() => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var arrayWithValues = xhttp.responseText.trim().split('\t');
                var betterArray = new Array(250)
                var currIndex = 0;
                for (let i = 0; i < 191; i++) {
                    var currString = arrayWithValues[i];
                    var index = currString.indexOf("\n")
                    if (index !== -1) {
                        var firstPart = currString.substring(0, index);
                        var secondPart = currString.substring(index + 1);
                        betterArray[currIndex] = firstPart;
                        currIndex++;
                        betterArray[currIndex] = secondPart;
                    }
                    else {
                        betterArray[currIndex] = arrayWithValues[i];
                    }
                    currIndex++;
                }

                let spreadsheet = new Array(48)
                for (let i = 0; i < 48; i++) {
                    var currRow = new Array(5);
                    for (let j = 0; j < 5; j++) {
                        currRow[j] = betterArray[i * 5 + j];
                    }
                    spreadsheet[i] = currRow;
                }
                
                for (let i = 0; i < 48; i++){
                    let currRow = spreadsheet[i];
                    var sites = currRow[1].split(" ").join("").split(",");
                    if (sites.length === 1){
                        sessionStorage.setItem(currRow[0] + "links", [sites[0], currRow[2]]);
                    }
                    else if (sites.length === 2){
                        sessionStorage.setItem(currRow[0] + "links", [sites[0], currRow[2], sites[1], currRow[3]]);
                    }
                    else {
                        sessionStorage.setItem(currRow[0] + "links", [sites[0], currRow[2], sites[1], currRow[3], sites[2], currRow[4]]);
                    }
                }
                setLinkData(spreadsheet);
                console.log("links set");
            };
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }, [url]);
    return linkData;
}

const convertTo1D = (data) => {
    let spreadsheet = new Array (48);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 6; j++){
            spreadsheet[i * 6 + j] = data[i][j];
        }
    }
    return spreadsheet;
}

const calculateResults = (data) => {
    let preferences = new Map();
    let unratedDramas = new Map();
    let unratedDramasInfo = new Map();
    if (data != null){
        data = convertTo1D(data); //convert from 8x6 to 48
        for (let i = 0; i < data.length; i++){ //loop through dramas and add ones rated to preference and ones not rated to dramas
            let score = 0;
            var name = data[i][0];
            var genres = data[i][1].split(" ").join("").split(','); //removes spaces, then separate list of genres into array
            var description = data[i][2];
            var actors = data[i][3];
            var currRating = document.getElementById('rate' + name);
            if (currRating.classList.contains("rateStatic")){
                var stars = countStars(name);
                if (stars === 3){
                    score += 0.01;
                }
                else {
                    score += (stars - 3) * 0.5; //count stars and calculate score
                }
                for (let i = 0; i < genres.length; i++){ //loop through genres and update preferences
                    var currGenre = genres[i];
                    var currPreference = preferences.get(currGenre)
                    if (currPreference == null){
                        preferences.set(currGenre, [score, 1]);
                    }
                    else {
                        var [currScore, currNum] = currPreference;
                        preferences.set(currGenre, [(currScore * currNum + score)/(currNum + 1), currNum + 1]); //normalizing factor
                    }
                }
            }
            else {
                unratedDramas.set(name, genres);
                unratedDramasInfo.set(name, [actors, description]);
            }
        } 

        let dramaArray = Array.from(unratedDramas); //convert map to array
        for (let i = 0; i < dramaArray.length; i++){ //loop through all unrated dramas
            let genres = dramaArray[i][1]
            var count = 0;
            var score = 0;
            for (let j = 0; j < genres.length; j++){ //loop through all genres of each drama and add scores
                var prefScore = preferences.get(genres[j]);
                if (prefScore != null){
                    count++;
                    score += prefScore[0];
                }
            }
            if (count !== 0){
                dramaArray[i][1] = score/count; //normalize score in the end
            }
            else {
                dramaArray[i][1] = 0;
            }

        }

        dramaArray.sort(sortFun); //sort by score in descending order
        
        let finalRecs = new Array(4)
        for (let i = 0; i < 4; i++){ //take top 5
            let dramaName = dramaArray[i][0];
            let dramaInfo = unratedDramasInfo.get(dramaName);
            sessionStorage.setItem(dramaName + " actors", dramaInfo[0]);
            sessionStorage.setItem(dramaName + " info", dramaInfo[1]);
            finalRecs[i] = dramaName;
        }
        sessionStorage.setItem("recs", finalRecs)
        
    }
}

const sortFun = (a, b) => {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? 1 : -1;
    }
}

const countStars = (name) => {
    let count = 0;
    for (let i = 1; i <= 5; i++){
        var currStar = document.getElementById("star" + i + name);
        if (currStar.classList.contains("yellowStar")){
            count++;
        }
        else {
            break;
        }
    }
    return count;
}

function Home() {
    const data = useFetchDramas("https://docs.google.com/spreadsheets/d/e/2PACX-1vTGyDDhDVVwIny-eqm4Rl5AbpaVrpQ0p9jDg_9pWwsAZ5C4wDKDBce9Itf7w3qNhKtAa0NEuw45RNHB/pub?output=tsv");
    const links = useFetchLinks("https://docs.google.com/spreadsheets/d/e/2PACX-1vTv_Ick-6MBeEArH8EYUl3Whsd80S4h9Ad3eCoK8FITVabEV2dhI4IfMANuBL5CLSVFxonzuJMoxZL5/pub?output=tsv");
    sessionStorage.setItem("linkData", links);
    sessionStorage.setItem("dramaData", data);
    if (data != null) {
        var frameData = data.map(x => x.map(y => <Frame name={y[0]} year={y[4]} image={require('../images/' + y[0] + '.jpg').default} />))
        frameData = frameData.map(x => <div className="Row">{x}</div>)
        
        return (
            <div className="Home">
                <Navbar />
                {frameData}
                <Link className="buttonGenerate" to="/results">
                    <button className="buttonGenerate" onClick={() => calculateResults(data)}>GENERATE</button>
                </Link>
            </div>
        )
    }
    else {
        return (
            <div className="Home">
                <Navbar />
                <div className="Loading"></div>
            </div>
        );
    }
}

export default Home;