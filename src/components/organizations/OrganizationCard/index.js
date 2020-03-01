import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { KeyValueRow, KeyListValueRow } from './KeyValueRow';
import ContactIcon from './ContactIcon';
import { RESOURCES_LIST, SERVING_TARGET } from '..';


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
    resourceList:{

    }
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
    let resourceList = org.resources.map(r => {
        let res = RESOURCES_LIST.find(res => res.id == r);
        if(res){
            return res.text;
        }
        return "";
    });
    if(org.customResources != ''){
        resourceList.push(org.customResources);
    }
    let servingList = org.servingTargets.map(t => {
        let tar = SERVING_TARGET.find(tar => tar.id == t);
        if(tar){
            return tar.text;
        }
        return "";
    });
    if(org.customServingTarget != ''){
        servingList.push(org.customServingTarget);
    }
    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                {org.name}
                </Typography>
                {displayFields.map(f => {
                    if(org[f.key] != ''){
                        return (
                            <KeyValueRow key={f.key} keyName={f.title} value={org[f.key]}/>
                        )
                    }
                    
                })}
                <KeyListValueRow keyName={"資源類別"} valueList={resourceList}/>
                <KeyListValueRow keyName={"服務對象"} valueList={servingList}/>
            </CardContent>
            <CardActions>
                {
                    linkFields.map(link => {
                        if(org[link.key] != ''){
                            return (
                                <ContactIcon key={link.key} link={org[link.key]} type={link.type}/>
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