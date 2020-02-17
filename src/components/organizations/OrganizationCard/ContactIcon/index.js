import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles({
    iconCircle:{
        cursor: 'pointer',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#33b5a6'
    },
    icon:{
        color: '#ffffff',
        marginTop: 7,
        marginLeft: 7
        
    }
});

export var ContactIconTypes = [
    {
        type: "facebook",
        icon: faFacebook
    },{
        type: "link",
        icon: faLink
    },{
        type: "email",
        icon: faEnvelope
    },{
        type: "phone",
        icon: faPhone
    }
]

const getType = (name) => {
    return ContactIconTypes.find(type => type.type == name);
}

function ContactIcon(props){
    const {link, type} = props;
    const classes = useStyles();
    const typeData = getType(type);
    let hrefLink = link;
    if(!typeData){
        return ("");
    }
    if(typeData.type == 'email'){
        hrefLink = 'mailto:'+link;
    }
    if(typeData.type == 'phone'){
        hrefLink = 'tel:'+link
    }
    return (
        <div className={classes.iconCircle}>
            <a href={hrefLink}>
                <FontAwesomeIcon className={classes.icon} icon={typeData.icon}/>
            </a>
        </div>
    )
}

export default ContactIcon;