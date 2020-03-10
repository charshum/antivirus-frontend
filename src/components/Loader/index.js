import React, { useState, createRef, useEffect } from 'react';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { makeStyles } from '@material-ui/core/styles';


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 200px;
`;

const useStyles = makeStyles({
    loader:{
        height: '100%',
        width: '100%',
        zIndex: 1200,
        background: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        top: 0
    },
    loaderHide:{
        display: 'none'
    }
})

function LoaderNM(props){
    const { show } = props;
    //console.log("showLoader: "+show);
    const classes = useStyles();

    return(
        <div className={classes.loader} hidden={!show}>
            <BounceLoader color={"#ffffff"} css={override} size={80} loading={show}/>
        </div>
    )
     
}

function areEqual(prevProps, nextProps){
    return prevProps.show == nextProps.show;
}

export const Loader = React.memo(LoaderNM, areEqual);
