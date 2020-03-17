import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ArticleLinks } from './articleLink';

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
        img: 'https://www.inmediahk.net/files/column_images/03172.jpg',
        link: "https://www.inmediahk.net/node/1071622"
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