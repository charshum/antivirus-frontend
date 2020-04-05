import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { KeyValueRow } from '../../organizations/OrganizationCard/KeyValueRow';

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
    }
  });

const displayFields = [
    {
        key: 'chiAddr',
        title: '中文地址'
    },
    {
        key: 'engAddr',
        title: 'English address'
    },
    {
        key: 'district',
        title: '地區'
    },
    {
        key: 'endDate',
        title: '檢疫結束日期'
    }
]

export function BuildingCard(props){
    const { building } = props;
    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <CardContent>
                {displayFields.map(f => {
                    if(building[f.key] != ''){
                        return (
                            <KeyValueRow key={f.key} keyName={f.title} value={building[f.key]}/>
                        )
                    }
                    
                })}
                
            </CardContent>
        </Card>        
    )

}

export function BuildingCardGen(props){
    const { building, displayFields } = props;
    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <CardContent>
                {displayFields.map(f => {
                    if(building[f.key] != ''){
                        return (
                            <KeyValueRow key={f.key} keyName={f.title} value={building[f.key]}/>
                        )
                    }
                    
                })}
                
            </CardContent>
        </Card>        
    )

}