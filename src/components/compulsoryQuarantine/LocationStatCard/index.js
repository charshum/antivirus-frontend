import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { KeyValueRow } from '../../organizations/OrganizationCard/KeyValueRow';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles({
    root: {
      
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    card:{
        marginBottom: 10,
        minWidth: 250,
        cursor: 'pointer',
        borderBottom: '5px solid white',
        ['@media(max-width: 650px)']:{
            minWidth: 200,
        }
    },
    cardContent:{
        paddingBottom: '10px !important',
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 0,
    },
    cardSelected:{
        marginBottom: 10,
        minWidth: 250,
        cursor: 'pointer',
        borderBottom: '5px solid #008678',
        ['@media(max-width: 650px)']:{
            minWidth: 200,
        }
    },
    cardWrapper:{
        width: '90%'
    },
    arrow:{
        paddingTop: 35,
        color:'rgba(0, 0, 0, 0.54)'
    }
  });

export function LocationStatCard(props){
    const { next, selected, locationName, count, endedCount, percentage, onClick } = props;
    const classes = useStyles();
    const card = selected ? classes.cardSelected : classes.card
    return(
        <Card className={card} onClick={onClick}>
            <CardContent className={classes.cardContent}>
                <div className={classes.cardWrapper}>
                    <div className={classes.title}>
                        {locationName}
                    </div>
                    <KeyValueRow keyLonger={true} keyName={"檢疫隔離大廈數量"} value={count}/>
                    <KeyValueRow keyLonger={true} keyName={"完成隔離數量"} value={endedCount}/>
                    <KeyValueRow keyLonger={true} keyName={"完成百分比"} value={percentage+'%'}/>
                </div>
                {
                    next ? 
                    <div className={classes.arrow}>
                        <ArrowForwardIosIcon style={{ fontSize: 12 }}/>
                    </div>:""
                }

            </CardContent>
        </Card>
    )
}