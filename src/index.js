import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const lightUpStars = starNumber => {
  for (let i = 1; i <= 5; i++){
      //var elem = document.getElementById("star" + i);
      //elem.style.background = {grayStar};
      console.log("star" + i);
  }
  for (let i = 1; i <= starNumber; i++){
      //var elem = document.getElementById("star" + i);
      //elem.style.background = {yellowStar};
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

