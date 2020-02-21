import React, { Children } from 'react';
import style from './style.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, ThemeProvider, createStyles } from '@material-ui/core/styles';
import Banner from './banner/banner';
import Organization from '../organizations';
import teal from '@material-ui/core/colors/teal';
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
            top: 95,
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
            backgroundColor: '#dcdddd',
            paddingTop: 143
        },
        emptyTab:{
            textAlign: 'center',
            color: '#333333',
            marginTop: 100
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
                <ThemeProvider theme={theme}>
                    <Tabs indicatorColor="secondary" value={value} onChange={handleChange} centered={true} className={classes.tabs} aria-label="simple tabs example">
                        <Tab className={classes.tab} label="活動" />
                        <Tab className={classes.tab} label="組織" />
                        <Tab className={classes.tab} label="關於我們" />
                    </Tabs>
                </ThemeProvider>
            </AppBar>
            <TabContent index={0} value={value}>
                <div className={classes.emptyTab}>
                    {"暫無活動"}
                </div>
            </TabContent>
            <TabContent index={1} value={value}>
                <Organization data={orgData}/>
            </TabContent>
            <TabContent index={2} value={value}>
                <AboutUs/>
            </TabContent>

        </div>

        
    )
    
}

export default Main;