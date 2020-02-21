import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles({
    root:{

    },
    title:{
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 10
    },
    formLink:{
    
    },
    para1:{
        
    },
    para2:{
        marginTop: 10,
        marginBottom: 10
    },
    aboutus:{
        background: '#ffffff',
        marginBottom: 20,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        maxWidth: 500,
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        ['@media(max-width: 500px)']:{
            borderRadius: 0
        }
    },
    contactus:{
        background: '#ffffff',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        maxWidth: 500,
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        ['@media(max-width: 500px)']:{
            borderRadius: 0
        }
    },
    row:{
        display: 'flex'
    },
    label:{
        width: '30%'
    },
    value:{
        width: '70%'
    },
    valueLink:{
        width: '70%'
    }
})

const link = "http://bit.ly/antivirushk";

export function AboutUs(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.aboutus}>
                <Typography className={classes.title}>
                    {"關於我們 About Us"}
                </Typography>
                <Typography className={classes.para1}>
                    {`武漢肺炎期間，民間抗疫資源缺乏，民間各方發起共享資源收集並分發口罩、消毒液和洗手液等物資。
                    我們「抗疫資源分配平台」希望讓有心人更容易找到合適的分配點，提供有效的支援，現在發起資源分配點登記行動。`}
                </Typography>
                <Typography className={classes.para2}>
                    {`我們的目的是把全香港正在進行有關資源分發的轉送點，有系統地收集及整理，
                    讓有心人可以更有效及容易找到附近合適的分配點，去捐贈物資，代為分發，從而達到資源有效分配，並能落在真正有需要的人身上。`}
                </Typography>
                
                <a className={classes.formLink} href={link}>
                    {"登記表格"}
                </a>
            </div>
            <div className={classes.contactus}>
                <Typography className={classes.title}>
                    {"聯絡我們 Contact Us"}
                </Typography>
                <div className={classes.row}>
                    <Typography className={classes.label}>
                        {`Facebook`}
                    </Typography>
                    <a className={classes.valueLink} href={"https://www.facebook.com/AntivirusResourceAllocationPlatform"}>
                        {"AntivirusResourceAllocationPlatform"}
                    </a>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.label}>
                        {`Email`}
                    </Typography>
                    <a className={classes.valueLink} href={"mailto:antivirushongkong@gmail.com"}>
                        {"antivirushongkong@gmail.com"}
                    </a>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.label}>
                        {`Telegram`}
                    </Typography>
                    <Typography className={classes.value}>
                        {`@heslaw`}
                    </Typography>
                </div>
            </div>
        </div>
    )
}