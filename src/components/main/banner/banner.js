import React from 'react';
import style from './style.css'
import banner from '../../../assets/images/Banner_Web.png'
import bannerMobile from '../../../assets/images/Banner_Mobile.png'
function Banner(){
    return(
        <div className="banner">
            <picture>
                <source media="(min-width: 601px)" srcSet={banner}/>
                <source media="(max-width: 600px)" srcSet={bannerMobile}/>
                <img className="banner-image" src={banner}/>
            </picture>
        </div>
    )
}


export default Banner;