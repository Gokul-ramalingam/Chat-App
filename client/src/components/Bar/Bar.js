import React from 'react'

import online from '../../assets/online.png';
import close from '../../assets/close.png';

import './Bar.css' 

const Bar = ({room}) => {
    return(
        <div className="Bar">
       <div className="leftInnerContainer">
        <img className="onlineIcon" src={online} alt="online icon" />
        <h3>{room}</h3>
      </div>
     <div className="rightInnerContainer">
      <a href="/"><img src={close} alt="close icon" /></a>
     </div>
    </div>
    )
}

export default Bar;