import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/main';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Switch, Route, Link, BrowserRouter } from 'react-router-dom';


const useStyles = makeStyles({
        emptyComponent:{
            height:0,
            width:0
        }
});



function App(props) {

  const [orgData, setOrgData] = useState([]);
  const [currentTab, setTab] = useState(1);

  useEffect(() => {
    axios
      .get(
        "https://api.antivirushk.com/getOrg",
        {
          auth: {
            username: 'admin',
            password: 'admin'
          }
        }
      )
      .then(({ data }) => {
        setOrgData(data);
      });
  }, []);


  const onRouteChanged = (tab) => {
    setTab(tab);
  }
  

 
  return (
    <div>
      <Main orgData={orgData} tab={currentTab}/>      
    </div>

  );
}

export default App;
