import React, { Children } from 'react';
import style from './style.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Banner from './banner/banner';
import Organization from '../organizations';


function TabContent(props){
    const { children, value, index } = props;
    const classes = useStyles();
    return(
        <div
            className={classes.tabContent}
            hidden={value !== index}
        >
            {children}
        </div>
    )
}


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        appBar: {
            top: 175,
            backgroundColor: '#008678',
            position: 'fixed'
        },
        tabs:{
            display: 'flex'
        },
        tab:{
            flexGrow: 1
        },
        tabContent:{
            backgroundColor: '#6fe9d8',
            paddingTop: 223
        },
        emptyTab:{
            textAlign: 'center',
            color: '#ffffff',
            marginTop: 100
        }
    }),
);


function Main(props){
    const { orgData } = props
    const [value, setValue] = React.useState(1);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Banner />
            <AppBar className={classes.appBar} position="static">
                <Tabs indicatorColor="primary" value={value} onChange={handleChange} centered={true} className={classes.tabs} aria-label="simple tabs example">
                    <Tab className={classes.tab} label="活動" />
                    <Tab className={classes.tab} label="組織" />
                </Tabs>
            </AppBar>
            <TabContent index={0} value={value}>
                <div className={classes.emptyTab}>
                    {"暫無活動"}
                </div>
            </TabContent>
            <TabContent index={1} value={value}>
                <Organization data={orgData}/>
            </TabContent>

        </div>

        
    )
    
}

export default Main;