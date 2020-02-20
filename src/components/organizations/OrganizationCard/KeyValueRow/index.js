import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    row:{
        display: 'flex'
    },
    label:{
        flexGrow: 1,
        width: '25%',
        fontSize: 14

    },
    value:{
        flexGrow: 1,
        width: '75%',
        fontSize: 14
    }

});

export function KeyListValueRow(props){
    const {keyName, valueList} = props;
    const classes = useStyles();
    return (
        <div className={classes.row}>
            <Typography className={classes.label} color="textSecondary" gutterBottom>
                {keyName}
            </Typography>
            <div className={classes.value}>
                    {
                        valueList.map(value => {
                            if(value != ''){
                                return(<Typography  className={classes.value} color="textSecondary" gutterBottom>
                                    {value}
                                </Typography>)                              
                            }else{
                                return "";
                            }
                        })
                    }
            </div>

        </div>
    )   
}


export function KeyValueRow(props){
    const {keyName, value} = props;
    const classes = useStyles();
    return (
        <div className={classes.row}>
            <Typography className={classes.label} color="textSecondary" gutterBottom>
                {keyName}
            </Typography>
            <Typography className={classes.value} color="textSecondary" gutterBottom>
                {value}
            </Typography>
        </div>
    )
}

