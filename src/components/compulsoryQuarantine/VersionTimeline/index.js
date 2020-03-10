import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HorizontalTimeline from 'react-horizontal-timeline';

const useStyle = makeStyles({
    root:{
        position: 'absolute',
        padding: 10,
        borderRadius: 40,
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
        bottom: 20,
        //left: 'calc(50% - 150px)',
        right: 20,
        zIndex: 1200,
        width: 280,
        height: 50,
        fontSize: 10,
        color: '#ffffff',
        background: 'linear-gradient(20deg, rgba(52,182,167,1) 37%, rgba(157,217,210,0.9150035014005602) 100%)',
        ['@media(max-width: 600px)']:{
            left: 'calc(50vw - 150px)',
            bottom: 88
        }
    },
    timeline:{
        height: 5,
        background: '#dcdddd',
        borderRadius: 2.5,
        marginTop: 30,
        width: 225,
        marginLeft: 27.5
    },
    timelineProgress:{
        height: 5,
        background: '#008678',
        borderRadius: 2.5,
        marginTop: 30
    },
    timelineItem:{
        width: 15,
        borderRadius: 7.5,
        cursor: 'pointer',
        background: '#008678',
        position: 'relative'
    },
    timelineContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 15,
        marginTop: -10,
        width: 225
    },
    timelineItemContent:{
        fontWeight: 600,
        position: 'absolute',
        top: -15,
        left: -9,
        width: 70
    },
    titles:{
        display: 'flex',
        flexDirection: 'row'
    },
    titleLeft:{
        marginLeft: 10,
        textAlign: 'left',
        flexGrow: 1,
        fontWeight: 600
    },
    titleRight:{
        marginRight: 10,
        textAlign: 'right',
        flexGrow: 1,
        fontWeight: 600
    }
})

export function VersionTimeline(props){
    const { versionList, onTimelineClicked } = props;
    const dateList = versionList ? versionList.map(v => {
        let dateArr = v.updateDate.split(" ")[0].split("-")
        return dateArr[1]+"-"+dateArr[2]
    }) : []
    //console.log(dateList)
    const classes = useStyle();

    const [index, setIndex] = useState(0);

    useEffect(()=>{
        if(versionList && versionList.length > 0){
           setIndex(versionList.length - 1) 
        }
    }, [versionList])

    const onClicked = (index) =>{
        setIndex(index);
        onTimelineClicked(index);
    }

    const progress = dateList.length > 1 ? ((index+1) - 1) / (dateList.length - 1) * 100 : 0;
    //console.log(index+" "+progress);
    return(
        <div className={classes.root}>
            <div className={classes.titles}>
               <div className={classes.titleLeft}>{"顯示過往資料"}</div>
               <div className={classes.titleRight}>{"最新資料"}</div> 
            </div>
            
            <div className={classes.timeline}>
                <div className={classes.timelineProgress} style={{width: `${progress}%`}}></div>
                <div className={classes.timelineContainer}>
                    {
                        dateList.map((date,i) => {
                            let color = '#dcdddd'
                            if(index >= i){
                                color = '#008678'
                            }
                            return (<div key={date} onClick={()=>onClicked(i)} className={classes.timelineItem} style={{backgroundColor: color}}>
                                <div  className={classes.timelineItemContent} >
                                    {date}
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}