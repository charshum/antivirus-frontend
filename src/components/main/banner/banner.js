import React from 'react';
import style from './style.css'
import banner from '../../../assets/images/banner-thin.png'
import bannerMobile from '../../../assets/images/banner-mobile.png'
function Banner(){
    return(
        <div className="banner">
            <picture>
                <source media="(min-width: 601px)" srcset={banner}/>
                <source media="(max-width: 600px)" srcset={bannerMobile}/>
                <img class="banner-image" src={banner}/>
            </picture>
        </div>
    )
}


export default Banner;