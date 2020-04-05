import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ArticleLinks } from './articleLink';

import inmedia from '../../assets/images/inmedia.jpg'

const useStyles = makeStyles({
    root:{
        paddingTop: 20
    }
})


const ARTICLE_LINKS = [
    { 
        title: '民間自發製作網站 盼共享抗疫資源：政府唔做就自己搞掂佢 | 獨媒報導 | 香港獨立媒體網',
        description: '',
        domain: 'inmediahk.net',
        img: inmedia,
        link: "https://www.inmediahk.net/node/1071622"
    },
    { 
        title: '【新冠肺炎】愛心共享　民間製「抗疫資源分配平台」盼港人互助',
        description: '武漢肺炎（新型冠狀病毒，COVID-19）疫情仍未受控，民間有人建立「抗疫資源分配平台」，共享資源收集並分發口罩、消毒液和洗手液等物資，並製作了「抗疫資源分配點地圖」。',
        domain: 'hk01.com',
        img:'https://cdn.hk01.com/di/media/images/cis/5e5dd94006d92a7657dd88aa.jpg/w75-Dux4eJKffeC003G-Tw8QBd3vknTM82v_Y_Nr_2M',
        link: "https://www.hk01.com/article/442558"
    }
]

export function Articles(props){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                ARTICLE_LINKS.map(l => {
                    return(<ArticleLinks linkData={l}/>)
                })
            }
        </div>
    )
}