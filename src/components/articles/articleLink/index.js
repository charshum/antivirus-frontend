import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        display: 'block',
        maxWidth: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'white',
        padding: 20,
        borderRadius: 20,
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        textDecoration: 'none'
    },
    imgRoot:{
        height: 200
    },
    title:{
        color: '#434343',
        textDecoration: 'none'
    },
    domain:{
        color: '#434343',
        fontWeight: 600,
        fontSize: 12,
        textDecoration: 'none',
        paddingTop: 5
    }
})

export function ArticleLinks(props){
    const { linkData } = props;
    const classes = useStyles();

    return (
        <a className={classes.root} href={linkData.link} target="_blank">
            <div className={classes.imgRoot}>
                <img src={linkData.img}/>
            </div>
            <div className={classes.title}>
                {linkData.title}
            </div>
            <div className={classes.domain}>
                {linkData.domain}
            </div>
        </a>
    )
}