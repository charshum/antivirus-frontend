import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{

    },
    hide:{
        display: 'none'
    }
})

export function SelfCheckResult(props){
    const classes = useStyles();

    const { show } = props;

    const rootClasses = show ? classes.root : classes.hide;
    
    return(
        <div className={rootClasses}>

        </div>)
}