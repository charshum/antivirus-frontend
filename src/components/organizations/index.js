import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OrganizationCard from './OrganizationCard';
import Grid from '@material-ui/core/Grid';
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "./style.css"
import SearchOverlay from './SearchOverlay';
import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

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
  mapRoot:{
      position: 'relative'
  },
  searchComponentBase:{
    transition: 'transform 0.5s ease',
    zIndex: 1200
  },
  searchComponent:{
      position: 'absolute',
      top: 10,
      right: 30
  },
  searchComponentMobile:{
    top: 223,
    position: 'fixed',
    background: '#008678',
    height: 'calc(100% - 223px)',
    right: 0
  },
  searchComponentBg:{
    position: 'fixed',
    top: 223,
    right: 0,
    zIndex: 1200,
    height: 'calc(100% - 223px)',
    background: '#008678',
    
  },
  searchComponentMobileHide:{
    transform: 'translateX(290px)'
  },
  currentCard:{
    position: 'absolute',
    top: 20,
    left: 30,
    zIndex: 1200,
    width: 300,
    maxHeight: 'calc(100% - 100px)',
    overflowY: 'auto',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    "& .MuiPaper-elevation1":{
        boxShadow: 'none'
    }
  },
  item:{
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20
  },
  viewButton:{
      background: '#ffffff',
      padding: 10,
      borderRadius: 10,
      margin: 10,
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  searchFAB:{
      position: "absolute",
      top: 20,
      right: 20,
      zIndex: 1200
  },
  searchFABHide:{
      display: 'none'
  },
  closeSearchFAB:{
      display: 'block',
      position: 'absolute',
      right: 20
  },
  hideCloseSearchFAB:{
      display: 'none'
  },
  listView:{

  },
  hideSearchComponent:{
      transform: 'translateX(290px)',
      position: 'fixed',
      top: 223,
      right: 0,
      zIndex: 1200,
      height: 'calc(100% - 223px)',
      background: '#008678',
  }
});


export const SERVING_TARGET = [
    {
        id: 0,
        text: "65歲以上長者 Elderly of above 65 years old"
    },
    {
        id: 1,
        text: "低收入家庭 Low income family"
    },
    {
        id: 2,
        text: "醫護人員 Medical Staff"
    },
    {
        id: 3,
        text: "無家者 Homeless"
    },
    {
        id: 4,
        text: "視障人士 Visually Impaired People"
    },
    {
        id: 5,
        text: "殘障人士 Disability"
    },
    {
        id: 6,
        text: "少數族裔 Ethic Minorities"
    },
    {
        id: 7,
        text: "清潔工作人員 Cleaning Staff"
    }
]

export const RESOURCES_LIST = [
    { 
        id: 0, 
        text: "口罩類：手術口罩 Surgical Mask"
    },
    {
        id: 1,
        text: "消毒用品類：消毒液 / 消毒酒精 / 消毒酒精搓手液 Disinfectant"
    },
    {
        id: 2,
        text: "家居清潔用品類：如漂白水 Bleach"
    }
]

const DISTRICT_LIST = [
    {
        id: 1,
        text: "Central and Western 中西區"
    },
    {
        id: 2,
        text: "Eastern 東區"
    },
    {
        id: 3,
        text: "Southern 南區"
    },
    {
        id: 4,
        text: "Wan Chai 灣仔區"
    },
    {
        id: 5,
        text: "Sham Shui Po 深水埗區"
    },
    {
        id: 6,
        text: "Kowloon City 九龍城區"
    },
    {
        id: 7,
        text: "Kwun Tong 觀塘區"
    },
    {
        id: 8,
        text: "Wong Tai Sin 黃大仙區"
    },
    {
        id: 9,
        text: "Yau Tsim Mong 油尖旺區"
    },
    {
        id: 10,
        text: "Islands 離島區"
    },
    {
        id: 11,
        text: "Kwai Tsing 葵青區"
    },
    {
        id: 12,
        text: "North 北區"
    },
    {
        id: 13,
        text: "Sai Kung 西貢區"
    },
    {
        id: 14,
        text: "Sha Tin 沙田區"
    },
    {
        id: 15,
        text: "Tai Po 大埔區"
    },
    {
        id: 16,
        text: "Tsuen Wan 荃灣區"
    },
    {
        id: 17,
        text: "Tuen Mun 屯門區"
    },
    {
        id: 18,
        text: "Yuen Long 元朗區"
    }
]



const applyFilterDistrict = (filter, data) => {
    if(filter.length == 0){
        return data;
    }
    let districts = DISTRICT_LIST.filter(district => filter.indexOf(district.id) > -1)
    let districtKey = districts.map(d => d.text)
    return data.filter(org => districtKey.indexOf(org.district) > -1)
}


const applyFilterRes = (filter, data) => {
    if(filter.length == 0){
        return data;
    }
    return data.filter(org => org.resources.some(r => filter.indexOf(Number(r)) > -1))
}

const applyFilterSerTarget = (filter, data) => {
    if(filter.length == 0){
        return data;
    }
    return data.filter(org => org.servingTargets.some(r => filter.indexOf(Number(r)) > -1))
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}

function getShowHideSearchFAB(width, showSearch, mapView){
    if(mapView == 0 && width > 600){
        return false;
    }
    if(mapView == 0 && width <= 600){
        if(showSearch){
            return false;
        }
        return true;
    }
    if(mapView == 1 && showSearch){
        return false;
    }
    if(mapView == 1&& !showSearch){
        return true;
    }
}


function Organization(props){
    const { height, width } = useWindowDimensions();
    const { data } = props;
    const [currentCard, setCurrentCard] = useState(-1);
    const [displayData, setDisplayData] = useState(data);
    const [districtFilter, setDistrictFilter] = useState([]);
    const [resFilter, setResFilter] = useState([]);
    const [serTargetFilter, setSerTargetFilter] = useState([]);
    const classes = useStyles();
    const NEbounds = [22.5329, 115.0]
    const SWbounds = [22.0907, 113.2]
    const bounds = [NEbounds, SWbounds]
    const [mapView, setMapView] = useState(0);
    const [showSearch, setShowSearch] = useState(width > 600 ? true : false);

    


    useEffect(() => { setDisplayData(data) }, [data])

    

    const onMarkerClicked = (id) => {
        console.log(id);
        setCurrentCard(id);
    }

    const filterDistrict = (list) => {
        setDistrictFilter(list);
        console.log(list);
        let filteredData = applyFilterDistrict(list, data);
        filteredData = applyFilterRes(resFilter, filteredData);
        filteredData = applyFilterSerTarget(serTargetFilter, filteredData);
        console.log(filteredData);
        setDisplayData(filteredData);
    }

    const filterRes = (list) => {
        setResFilter(list);
        console.log(list);
        let filteredData = applyFilterDistrict(districtFilter, data);
        filteredData = applyFilterRes(list, filteredData);
        filteredData = applyFilterSerTarget(serTargetFilter, filteredData);
        console.log(filteredData);
        setDisplayData(filteredData);
    }

    const filterSerTarget = (list) => {
        setSerTargetFilter(list);
        console.log(list);
        let filteredData = applyFilterDistrict(districtFilter, data);
        filteredData = applyFilterRes(resFilter, filteredData);
        filteredData = applyFilterSerTarget(list, filteredData);
        console.log(filteredData);
        setDisplayData(filteredData);
    }

    const handleViewChange = () => {
        if(mapView == 0){
            setMapView(1);
        }else{
            setMapView(0);
        }
    }

    const handleShowSearch = () => {
        setShowSearch(true);
    }

    const handleHideSearch = () => {
        setShowSearch(false);
    }

    let currentOrg = data.find(org => org.id == currentCard);
    return(
        <div className={classes.mapRoot}>
            <div className={
                classes.searchComponentBase + 
                ' ' + 
                (mapView == 0 ? width > 600 ? classes.searchComponent : classes.searchComponentMobile : classes.searchComponentBg) +
                ' ' +
                (mapView == 0 && width <= 600 ? showSearch ? "" : classes.searchComponentMobileHide : "") +
                ' ' +
                (mapView == 1 && !showSearch ? classes.hideSearchComponent : "")

                } >
                <SearchOverlay data={DISTRICT_LIST} name={"地區 District"} updateFilter={filterDistrict} values={districtFilter}/>
                <SearchOverlay data={RESOURCES_LIST} name={"資源類別 Resource Type"} updateFilter={filterRes} values={resFilter}/>
                <SearchOverlay data={SERVING_TARGET} name={"服務對象 Serving Target"} updateFilter={filterSerTarget} values={serTargetFilter}/>
                <Button variant="contained" className={classes.viewButton} onClick={handleViewChange}>{mapView == 0 ? "列表顯示" : "地圖顯示"}</Button>
                <Fab className={mapView > 0 || width <= 600 ? classes.closeSearchFAB : classes.hideCloseSearchFAB} onClick={handleHideSearch}>
                    <CloseIcon />
                </Fab>
            </div>
            <div hidden={mapView == 1}>
                <Map center={[ 22.5657, 114.0972]} zoom={11} minZoom={10} maxBounds={bounds} >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {displayData.map(org => {
                        if(org.lat > 0){
                            return(
                                <Marker onClick={() => onMarkerClicked(org.id)} position={[org.lat, org.lng]}>
                                    <Tooltip>
                                        {org.name}
                                    </Tooltip>
                                </Marker>
                            )
                        }else{
                            return ("")
                        }

                    })}
                </Map>
            </div>
            {
                currentOrg && mapView == 0 ?  <div className={classes.currentCard}><OrganizationCard org={currentOrg}/></div>: ""
            }
            <div hidden={mapView == 0} className={classes.listView}>
                <Grid className={classes.root} container justify="center" spacing={0}>
                    {displayData.map(org => {
                    return(
                        <Grid item md={12} className={classes.item}>
                            <OrganizationCard org={org}/>
                        </Grid>
                        
                    )   
                    })}
                </Grid>  
            </div>
            <Fab className={ getShowHideSearchFAB(width, showSearch, mapView) ? classes.searchFAB : classes.searchFABHide} onClick={handleShowSearch}>
                <SearchIcon />
            </Fab>
     
        </div>

    )
}


export default Organization