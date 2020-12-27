import './App.css';
import Frame from './components/Frame.js'
import React, { useState, useEffect } from 'react'
import Searchbar from './components/Searchbar.js'

const useFetch = url => {
  const [data, setData] = useState(null);

  useEffect( () => {
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
  },[url]);

  return {data};
}

function App() {

  const {data} = useFetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTGyDDhDVVwIny-eqm4Rl5AbpaVrpQ0p9jDg_9pWwsAZ5C4wDKDBce9Itf7w3qNhKtAa0NEuw45RNHB/pub?output=tsv")
  if (data != null){
    let frameData = data.map(x => x.map(y => <Frame name={y[0]} year={y[4]} image={require('./images/' + y[0] + '.jpg').default} />) )
    frameData = frameData.map(x => <div className="Row">{x}</div>)
    
    return (
      <div className="App">
        <Searchbar />
        {frameData}
      </div>
  
    )
  }
  else {
    return(<div></div>);
  }
}

export default App;
