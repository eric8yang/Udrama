import './Home.css';
import Frame from './Frame.js'
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar.js'
import { Link } from 'react-router-dom';

var frameData;

const useFetch = url => {
    const [data, setData] = useState(null);
    useEffect(() => {
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var arrayWithValues = xhttp.responseText.trim().split('\t')

                var betterArray = new Array(250)
                var currIndex = 0;
                for (let i = 0; i < 201; i++) {
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

    return { data };
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
    if (data != null){
        data = convertTo1D(data); //convert from 8x6 to 48
        for (let i = 0; i < data.length; i++){ //loop through dramas and add ones rated to preference and ones not rated to dramas
            let score = 0;
            var name = data[i][0];
            var genres = data[i][1].split(" ").join("").split(',') //removes spaces, then separate list of genres into array
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
            dramaArray[i][1] = score/count; //normalize score in the end
        }

        dramaArray.sort(sortFun); //sort by score in descending order
        let finalRecs = new Array(4);
        for (let i = 0; i < 4; i++){ //take top 5
            finalRecs[i] = dramaArray[i][0];
        }
        console.log(finalRecs);
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
    const { data } = useFetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTGyDDhDVVwIny-eqm4Rl5AbpaVrpQ0p9jDg_9pWwsAZ5C4wDKDBce9Itf7w3qNhKtAa0NEuw45RNHB/pub?output=tsv")
    if (data != null) {
        frameData = data.map(x => x.map(y => <Frame name={y[0]} year={y[4]} image={require('../images/' + y[0] + '.jpg').default} />))
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