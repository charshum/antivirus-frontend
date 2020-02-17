import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OrganizationCard from './OrganizationCard';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    marginTop: '20px'
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
});


function Organization(props){
    const { data } = props;
    const classes = useStyles();
    return(
        <Grid className={classes.root} container justify="center" spacing={2}>
            {data.map(org => {
             return(
                <Grid item xs={12} sm={6} md={4}>
                    <OrganizationCard org={org}/>
                </Grid>
                
             )   
            })}
        </Grid>
    )
}


export default Organization