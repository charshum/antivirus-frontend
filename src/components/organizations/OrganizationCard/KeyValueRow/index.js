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
    labelL:{
        flexGrow: 1,
        width: '75%',
        fontSize: 14

    },
    valueL:{
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
    const {keyName, valueList, keyLonger} = props;
    const classes = useStyles();
    let labelClass = keyLonger ? classes.labelL : classes.label
    let valueClass = keyLonger ? classes.valueL : classes.value

    return (
        <div className={classes.row}>
            <Typography className={labelClass} color="textSecondary" gutterBottom>
                {keyName}
            </Typography>
            <div className={valueClass}>
                    {
                        valueList.map(value => {
                            if(value != ''){
                                return(<Typography  key={value} className={classes.value} color="textSecondary" gutterBottom>
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
    const {keyName, value, keyLonger} = props;
    const classes = useStyles();
    let labelClass = keyLonger ? classes.labelL : classes.label
    let valueClass = keyLonger ? classes.valueL : classes.value

    
    return (
        <div className={classes.row}>
            <Typography className={labelClass} color="textSecondary" gutterBottom>
                {keyName}
            </Typography>
            <Typography className={valueClass} color="textSecondary" gutterBottom>
                {value}
            </Typography>
        </div>
    )
}

