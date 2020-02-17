import React from 'react';
import style from './style.css'
import banner from '../../../assets/images/banner-thin.png'

function Banner(){
    return(
        <div className="banner">
            <img className="banner-image" src={banner}/>
        </div>
    )
}


export default Banner;