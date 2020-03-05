import React, { Children, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createMuiTheme, makeStyles, ThemeProvider, createStyles } from '@material-ui/core/styles';
import Banner from './banner/banner';
import Organization from '../organizations';
import teal from '@material-ui/core/colors/teal';
import { CompulsoryQuarantineMap } from '../compulsoryQuarantine'
import { AboutUs } from '../aboutus';



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
            //top: 95,
            backgroundColor: '#008678',
            //position: 'fixed'
        },
        tabs:{
            display: 'flex'
        },
        tab:{
            flexGrow: 1
        },
        tabContent:{
            backgroundColor: '#dcdddd',
            //paddingTop: 143
        },
        hide:{
            display: 'none'
        },
        emptyTab:{
            textAlign: 'center',
            color: '#333333',
            marginTop: 100
        },
        emptyComponent:{
            height:0,
            width:0
        }
    }),
);


const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: {
            main: "#33B6A7",
        }
      }
  });

function Main(props){
    const { orgData, tab } = props
    const [value, setValue] = React.useState(1);

    /*useEffect(()=>{
        setValue(tab);
    })*/
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Banner />
            <AppBar className={classes.appBar} position="static">
                <ThemeProvider theme={theme}>
                    <Tabs indicatorColor="secondary" value={value} onChange={handleChange} centered={true} className={classes.tabs} aria-label="simple tabs example">
                        {/* <Tab className={classes.tab} label="活動" /> */}
                        {/* <Tab component={Link} to="/resources-point" className={classes.tab} label="資源分配點" />
                        <Tab component={Link} to="/599c-list" className={classes.tab} label="599C 強制檢疫名單" />
                        <Tab component={Link} to="/about-us" className={classes.tab} label="關於我們" /> */}
                        <Tab className={classes.tab} label="資源分配點" />
                        <Tab className={classes.tab} label="599C 強制檢疫名單" />
                        <Tab className={classes.tab} label="關於我們" />
                    </Tabs>
                </ThemeProvider>
            </AppBar>
{/*             <div className={classes.tabContent+" "+(value !== 0 ? classes.hide : "")} >
                <div className={classes.emptyTab}>
                    {"暫無活動"}
                </div>
            </div> */}
            <div className={classes.tabContent+" "+(value !== 0 ? classes.hide : "")}>
                <Organization data={orgData}/>
            </div>
            <div className={classes.tabContent+" "+(value !== 1 ? classes.hide : "")}>
                <CompulsoryQuarantineMap />
            </div>
            <div className={classes.tabContent+" "+(value !== 2 ? classes.hide : "")}>
                <AboutUs/>
            </div>
        </div>

        
    )
    
}

export default Main;