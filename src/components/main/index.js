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
import { Articles } from '../articles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { SelfCheck } from '../selfcheck';
import { CasesLivingAddress } from '../casesLivingAddress';




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
            flexDirection: 'row',
            justifyContent: 'center'
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
        },
        menu:{
            ['@media(max-width:599px)']:{
                width:'50%'
            },
        },
        menuButton:{
            color: '#ffffff',
            width: 300,
            height: 48,
            ['@media(max-width:599px)']:{
                width:'100%'
            },
            borderBottom: '2px solid #008678',
            borderRadius: 0
        },
        menuButtonSelected:{
            borderBottom: '2px solid #ffffff'
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
    const [value, setValue] = React.useState(2);
    const [mapMenuTitle, setMapMenuTitle] = React.useState("地圖 - 確診或疑似個案大廈");
    const [aboutMenuTitle, setAboutMenuTitle] = React.useState("關於我們");

    const [mapMenuAnchorEl, setMapMenuAnchorEl] = React.useState(null);
    const [aboutMenuAnchorEl, setAboutMenuAnchorEl] = React.useState(null);

    const handleMapMenuClick = event => {
        setMapMenuAnchorEl(event.currentTarget);
    };
    const handleAboutMenuClick = event => {
        setAboutMenuAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = (value) => {
        console.log(value)
        if(value == -1){
            setMapMenuAnchorEl(null);
            setAboutMenuAnchorEl(null);
            return;
        }
        setMapMenuAnchorEl(null);
        setAboutMenuAnchorEl(null);
        setValue(value);
    };


    useEffect(()=>{
        if(value == 1){
            setMapMenuTitle("地圖 - 599C 強制檢疫名單")
            setAboutMenuTitle("關於我們")
        }else if(value == 0){
            setMapMenuTitle("地圖 - 資源分配點")
            setAboutMenuTitle("關於我們")
        }else if(value == 2){
            setMapMenuTitle("地圖 - 確診或疑似個案大廈")
            setAboutMenuTitle("關於我們")
        }else if(value == 3){
            setMapMenuTitle("地圖")
            setAboutMenuTitle("關於我們")
        }else if(value == 4){
            setMapMenuTitle("地圖")
            setAboutMenuTitle("關於我們 - 媒體報導")
        }
        
    }, [value])

    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const mapMenuClass = classes.menuButton + ' ' + (value < 3 ? classes.menuButtonSelected : '')
    const aboutMenuClass = classes.menuButton + ' ' + (value >= 3 ? classes.menuButtonSelected : '')
    return (
        <div>
            <Banner />
            <AppBar className={classes.appBar} position="static">
{/*                 <ThemeProvider theme={theme}>
                    <Tabs scrollable indicatorColor="secondary" value={value} onChange={handleChange} centered={true} className={classes.tabs} aria-label="simple tabs example">
                        <Tab className={classes.tab} label="資源分配點" />
                        <Tab className={classes.tab} label="599C 強制檢疫名單" />
                        <Tab className={classes.tab} label="關於我們" />
                        <Tab className={classes.tab} label="媒體報導" />
                    </Tabs>
                </ThemeProvider> */}
{/*                 <div className={classes.menu}>
                    <Button className={classes.menuButton} aria-controls="simple-menu" aria-haspopup="true" onClick={()=>setValue(4)}>
                        自我檢查
                    </Button>
                </div> */}
                <div className={classes.menu}>
                    <Button className={mapMenuClass} aria-controls="simple-menu" aria-haspopup="true" onClick={handleMapMenuClick}>
                        {mapMenuTitle} 
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={mapMenuAnchorEl}
                        keepMounted
                        open={Boolean(mapMenuAnchorEl)}
                        onClose={() => handleMenuClose(-1)}>
                        <MenuItem onClick={() => handleMenuClose(2)}>{"確診或疑似個案居住過的住宅大廈名單"}</MenuItem>
                        <MenuItem onClick={() => handleMenuClose(1)}>{"599C 強制檢疫名單"}</MenuItem>
                        <MenuItem onClick={() => handleMenuClose(0)}>{"資源分配點"}</MenuItem>
                    </Menu>
                </div>
                <div className={classes.menu}>
                    <Button className={aboutMenuClass} aria-controls="simple-menu" aria-haspopup="true" onClick={handleAboutMenuClick}>
                        {aboutMenuTitle} 
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={aboutMenuAnchorEl}
                        keepMounted
                        open={Boolean(aboutMenuAnchorEl)}
                        onClose={() => handleMenuClose(-1)}>
                        <MenuItem onClick={() => handleMenuClose(3)}>{"關於我們"}</MenuItem>
                        <MenuItem onClick={() => handleMenuClose(4)}>{"媒體報導"}</MenuItem>
                    </Menu>
                </div>
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
                <CasesLivingAddress />
            </div>
            <div className={classes.tabContent+" "+(value !== 3 ? classes.hide : "")}>
                <AboutUs/>
            </div>
            <div className={classes.tabContent+" "+(value !== 4 ? classes.hide : "")}>
                <Articles />
            </div>
            <div className={classes.tabContent+" "+(value !== 5 ? classes.hide : "")}>
                <SelfCheck/>
            </div>
        </div>

        
    )
    
}

export default Main;