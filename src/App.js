import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/main';
import axios from 'axios'

function App() {

  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://go-api-dot-antivirus-center.appspot.com/getOrg",
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

  return (
    <Main orgData={orgData}/>
  );
}

export default App;
