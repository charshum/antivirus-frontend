import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyValueRow from './KeyValueRow';
import ContactIcon from './ContactIcon';

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      minHeight: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
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

const displayFields = [
    {
        key: 'orgType',
        title: '組織類型'
    },
    {
        key: 'district',
        title: '地區'
    },
    {
        key: 'address',
        title: '地址'
    },
    {
        key: 'contactPersonName',
        title: '聯絡人'
    }
]

const linkFields = [
    {
        key: 'facebook',
        type: 'facebook'
    },{
        key: 'email',
        type: 'email'
    },{
        key: 'website',
        type: 'link'
    },{
        key: 'phone',
        type: 'phone'
    }
]

function OrganizationCard(props){
    const classes = useStyles();

    const { org } = props;
    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                {org.name}
                </Typography>
                {displayFields.map(f => {
                    return (
                        <KeyValueRow keyName={f.title} value={org[f.key]}/>
                    )
                })}
            </CardContent>
            <CardActions>
                {
                    linkFields.map(link => {
                        if(org[link.key] != ''){
                            return (
                                <ContactIcon link={org[link.key]} type={link.type}/>
                            )
                        }else{
                            return ("")
                        }
                    })
                }
            </CardActions>
        </Card>
    )
}

export default OrganizationCard;