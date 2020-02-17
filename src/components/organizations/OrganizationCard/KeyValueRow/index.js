import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    row:{
        display: 'flex'
    },
    label:{
        flexGrow: 1,
        width: '20%',
        fontSize: 14

    },
    value:{
        flexGrow: 1,
        width: '80%',
        fontSize: 14
    }

});


function KeyValueRow(props){
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

export default KeyValueRow;