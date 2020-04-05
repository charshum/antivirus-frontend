import React, { useState, createRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import './style.css'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { DISTRICT_LIST, CITY } from '../organizations'
import axios from 'axios'
import { BuildingCard } from './BuildingCard';
import CloseIcon from '@material-ui/icons/Close';
import L from 'leaflet'
import greyMarkerImg from '../../assets/images/map-marker/marker-icon-grey.png'
import blueMarkerImg from '../../assets/images/map-marker/marker-icon-blue.png'
import * as moment from 'moment'
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { LocationStatCard } from './LocationStatCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import { Loader } from '../Loader';
import ErrorIcon from '@material-ui/icons/Error';
import { VersionTimeline } from './VersionTimeline';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import TimelineIcon from '@material-ui/icons/Timeline';

const useStyles = makeStyles(
    {
        mapRoot:{
            position: 'relative',
            
        },
        cardBar:{
            display: 'block',
            height: 20,
            position: 'relative'
          },
          closeCardButton:{
            position: 'absolute',
            right: 10,
            cursor: 'pointer',
            color: '#757575'
          },
          cardContent:{
            maxHeight: 'calc(100vh - 300px)',
            overflowY: 'auto'
          },
          currentCard:{
            position: 'absolute',
            top: 80,
            left: 30,
            zIndex: 1200,
            width: 300,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            borderRadius: 25,
            padding: 10,
            backgroundColor: '#ffffff',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
            "& .MuiPaper-elevation1":{
                boxShadow: 'none'
            },
            ['@media(max-width: 600px)']:{
                top: 80,
                left: 'auto',
                right: 'auto'
            }
          },
          filter:{
            position: 'absolute',
            top: 10,
            left: 50,
            zIndex: 1200
          },
          timelineFab:{
            position: 'absolute',
            bottom: 88,
            left: 20,
            zIndex: 1200
          },
          statPanel:{
            position: 'absolute',
            top: 10,
            left: 50,
            zIndex: 1300
          },
          statPanelInner:{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10
          },
          cityPanel:{
            maxHeight: 'calc(100vh - 143px)'
          },
          districtPanel:{
            marginLeft: 20,
            maxHeight: 'calc(100vh - 300px)',
            overflow: 'auto',
            ['@media(max-width: 650px)']:{
                marginLeft: 10,
            },
            ['@media(min-width: 651px)']:{
                marginLeft: 10,
                maxHeight: 'calc(100vh - 230px)'
            }
          },
          closeStatPanel:{
              marginLeft: 10
          },
          cityPanelHideOnMobile:{
            display: 'none',
            ['@media(max-width: 650px)']:{
                display: 'none'
            }
          },
          cityShortPanelHideOnDesktop:{
            display: 'none',
            ['@media(max-width: 650px)']:{
                display: 'flex',
                flexDirection: 'column'
            }
          },
          mobileCityPanelIcon:{
            marginBottom: 10
          },
          backIconShow:{
            display: 'block',
            ['@media(max-width: 650px)']:{
                display: 'block'
            }
          },
          backIconHide:{
            display: 'none'
          },
          closeIconHide:{
            display: 'none',
            ['@media(min-width: 651px)']:{
                marginLeft: 10,
                display: 'block'
            }
          },
          closeIcon:{
            marginLeft: 10,
            display: 'block'
          },
          toggleNotEndedOnlyButton:{
            position: 'absolute',
            bottom: 20,
            left: 10,
            background: '#ffffff',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
            borderRadius: 10,
            zIndex: 1200,
            '&:hover':{
                background: '#eeeeee' 
            },
            ['@media(max-width: 600px)']:{
                bottom: 168
            }
          },
          reportBtn:{
            cursor: 'pointer'
          },
          closeTimelinePanel:{
            left: 'calc(50vw + 130px)',
            bottom: 173,
            position: 'absolute',
            width: 24,
            height: 24,
            zIndex: 1200,
            background: 'white',
            borderRadius: 12,
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',

          },
          closeTimelineButton:{
            cursor: 'pointer',
            color: '#757575'
          }
    }
)

const mapRef = createRef()

const greyIcon = new L.Icon({
    iconUrl: greyMarkerImg,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


const blueIcon = new L.Icon({
    iconUrl: blueMarkerImg,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
  

const MapMarker = (props) => {
    const { version1 ,quarantineBuildingData,  onMarkerClicked, notEndedOnly, hideLoader } = props;
    //console.log(version);
    useEffect(()=>{
        console.log("updated ");
        console.log("useEffect marker updated: "+Date.now());
        if(version1 != -1){
            setTimeout(()=>{
                hideLoader(); 
            }, 500) 
        }
        
        
    },[notEndedOnly,version1, quarantineBuildingData])

    //console.log("render marker");
    return (
        <div>
            { quarantineBuildingData.map((districtData,i) => {
                return(
                    <MarkerClusterGroup key={i}>
                        {
                            Array.isArray(districtData.data) && districtData.data.map(building => {
                                if(building.lat > 0){
                                    let ended = moment(building.endDate).isBefore(moment(),'day')
                                    if(ended && notEndedOnly){
                                        return(
                                            ""
                                        )
                                    }
                                    let markerIcon = ended ? greyIcon : blueIcon
                                    return(
                                        <Marker icon={markerIcon} key={building.id} onClick={() => onMarkerClicked(building)} position={[building.lat, building.lng]}>
                                            <Tooltip>
                                                {building.chiAddr}
                                            </Tooltip>
                                        </Marker>
                                    )
                                }else{
                                    return ("")
                                }
                            })
                        }
                    </MarkerClusterGroup>
                )


            })}
        </div>
    )
}

function areEqual(prevProps, nextProps) {
    if(prevProps.notEndedOnly != nextProps.notEndedOnly){
        return false;
    }
    if(!prevProps.quarantineBuildingData || !nextProps.quarantineBuildingData){
        return false;
    }
    if(nextProps.version1 == -1){
        return true;
    }
    if(prevProps.version1 != nextProps.version1){
        //console.log('version updated')
        return false;
    }
    if(nextProps.quarantineBuildingData.length > prevProps.quarantineBuildingData.length){
        return false;
    }
    
    if(prevProps.quarantineBuildingData.length > 0){
        if(prevProps.quarantineBuildingData[0].data == null && nextProps.quarantineBuildingData[0].data != null){
            return false;
        }
    }

    if(nextProps.quarantineBuildingData.length > 0){
        if(nextProps.quarantineBuildingData[0].data == null){
            return true;
        }
    }
    
    if(prevProps.quarantineBuildingData.length == nextProps.quarantineBuildingData.length){
        return true;
    }
}

const MapMarkerMemo = React.memo(MapMarker, areEqual);


function StatPanel(props){
    const classes = useStyles();
    const { districtStatDataList, onClosePanel, notEndedOnly, setnotEndedOnly } = props;
    const [currentCity, setCurrentCity] = useState(-1);
    const cityStatData = CITY.map(city => {
        let cityData = {};
        cityData.name = city.name;
        let cityCount = city.district.reduce((total, current)=>{
            let district = districtStatDataList.find(statData => statData.district == current)
            return total + (district ? district.count : 0)
        },0)
        let cityEndedCount = city.district.reduce((total, current)=>{
            let district = districtStatDataList.find(statData => statData.district == current)
            return total + (district ? district.endedCount : 0)
        },0)
        let cityPercentage = ((cityEndedCount/cityCount) * 100).toFixed(1);
        cityData.count = cityCount;
        cityData.endedCount = cityEndedCount;
        cityData.percentage = cityPercentage;
        cityData.district = city.district;
        cityData.shortName = city.shortName;
        cityData.latlng = city.latlng;
        cityData.zoom = city.zoom;

        return cityData;
    })

    const handleCityCardClicked = (city)=>{
        //console.log(city);
        setCurrentCity(city);
        let cityData = cityStatData[city];
        if(mapRef){
            const map = mapRef.current
            if(map != null){
                map.leafletElement.setView(cityData.latlng, cityData.zoom);
            }
        }
    }

    const handleDistrictCardClicked = (district)=>{
        let districtData = district;
        //console.log("zoom to")
        //console.log(districtData);
        if(mapRef){
            const map = mapRef.current
            if(map != null){
                map.leafletElement.setView(districtData.latlng, districtData.zoom);
            }
        }
    }


    const handleBack = () => {
        setCurrentCity(-1);
    }


    let cityPanelClass = classes.cityPanel + (currentCity > -1 ? ' '+classes.cityPanelHideOnMobile:'')

    let backIcon = (currentCity > -1 ? ' '+classes.backIconShow:classes.backIconHide)
    
    let closePanel = (currentCity > -1 ? ' '+classes.closeIconHide:classes.closeIcon)
    return(
        <div className={classes.statPanel}>
            <div className={classes.statPanelInner}>
                <div className={cityPanelClass}>
                    {
                        cityStatData.map((city,i) => {
                            return(
                                <LocationStatCard key={city.shortName} next={true} selected={currentCity == i} onClick={() => handleCityCardClicked(i)} locationName={city.name} count={city.count} endedCount={city.endedCount} percentage={city.percentage}/>
                            )
                        })
                    }
                    
                </div>
                <Fab className={backIcon} onClick={()=>handleBack()}>
                    <ArrowBackIcon />
                </Fab>
                {
                    currentCity > -1 ?
                    <div className={classes.districtPanel}>
                        {
                            cityStatData[currentCity].district.map((district)=>{
                                let districtData = districtStatDataList.find(statData => statData.district == district)
                                return(
                                    <LocationStatCard key={districtData.district} onClick={()=>handleDistrictCardClicked(districtData)} locationName={districtData.name} count={districtData.count} endedCount={districtData.endedCount} percentage={districtData.percentage}/>
                                )
                            })                        
                        }
                    </div>:""

                }
                <div className={classes.closeIconFullHeight} onClick={onClosePanel}>
                  <Fab className={closePanel} onClick={onClosePanel}>
                        <CloseIcon />
                    </Fab>  
                </div>
                
            </div>
        </div>
    );
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

export function CompulsoryQuarantineMap(){

    const { height, width } = useWindowDimensions();
    const [dataByVersion, setDataByVersion] = useState({});

    const [quarantineBuildingData, setQuarantineBuildingData] = useState([]);
    const [districtStatDataList, setdistrictStatDataList] = useState([]);
    const [versionList, setVersionList] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);

    const [currentCity, setCurrentCity] = useState(-1);

    const [filterPanelOpen, setFilterPanelOpen] = useState(false);

    const [timelinePanelOpen, setTimelinePanelOpen] = useState(false);

    const [notEndedOnly, setnotEndedOnly] = useState(false);

    const [showLoader, setShowLoader] = useState(false);

    const [version, setVersion] = useState(-1);
    const [version1, setVersion1] = useState(-1);

    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(()=>{
        const map = mapRef.current
        if(map != null){
           map.leafletElement.invalidateSize(); 
        }
    })


    useEffect(() => {
        axios.get("https://storage.googleapis.com/antivirus-data/version.json",{
        }).then((data)=>{
            setVersionList(data.data.versions);
            let versionList = data.data.versions
            ReactDOM.unstable_batchedUpdates(()=>{
                setVersion(versionList[versionList.length-1].id);
                setShowLoader(true);
            });
        })
  
    }, []);


    useEffect(() => {
        setShowLoader(true);
        console.log("useEffect version updated: "+Date.now());
        
        if(dataByVersion[version]){
            ReactDOM.unstable_batchedUpdates(()=>{
                console.log("useEffect data reuse: "+Date.now());
                setVersion1(version)
                setdistrictStatDataList(dataByVersion[version].districtStatData);
                setQuarantineBuildingData(dataByVersion[version].buildingData);
            })
            
        }else{
            if(version == -1){
                return;
            }
            let requests = [];
            DISTRICT_LIST.forEach((district,i) => {
            requests.push(axios
                .get(
                `https://storage.googleapis.com/antivirus-data/version${version}/compulsory_quaratine_${i}.json`,
                {}
                ))                  
            })
            axios.all(requests).then(axios.spread((...data)=>{
                let buildingData = [];
                let districtStatDataList = [];
                data.forEach(d => {
                    let districtData = {}
                    districtData.data = d.data.data;
                    districtData.count = d.data.count;
                    districtData.endedCount = d.data.endedCount
                    districtData.percentage = ((d.data.endedCount/districtData.count) * 100).toFixed(1);

                    let districtStat = {}
                    districtStat.count = d.data.count;
                    districtStat.endedCount = d.data.endedCount
                    districtStat.percentage = ((d.data.endedCount/districtData.count) * 100).toFixed(1);
                    let districtInfo = DISTRICT_LIST.find(district => district.chiKey === d.data.district);
                    districtStat.district = districtInfo.id;
                    districtStat.name = districtInfo.text;
                    districtStat.latlng = districtInfo.latlng;
                    districtStat.zoom = districtInfo.zoom;


                    districtStatDataList.push(districtStat);
                    buildingData.push(districtData);
                })

                let dataByVersionCopy = Object.assign({},dataByVersion);
                dataByVersionCopy[version] = {
                    districtStatData: districtStatDataList,
                    buildingData: buildingData
                }
                
                console.log("useEffect version data downloaded: "+Date.now());
                
                setTimeout(()=>{
                    setShowLoader(true);
                    ReactDOM.unstable_batchedUpdates(()=>{
                        setVersion1(version)
                        setdistrictStatDataList(districtStatDataList);
                        setQuarantineBuildingData(buildingData);
                        setDataByVersion(dataByVersionCopy)  
                    })

                }, 300)
                
                

                
            }))
        }

        
    },[version])


    /*useEffect(()=>{
        let requests = [];
        DISTRICT_LIST.forEach(district => {
        requests.push(axios
            .get(
            `https://api.antivirushk.com/getQuaratineBuildingList?start=1&count=6000&district=${district.chiKey}`,
            {}
            ))                  
        })
        axios.all(requests).then(axios.spread((...data)=>{
            let buildingData = [];
            let districtStatDataList = [];
            data.forEach(d => {
                let districtData = {}
                districtData.data = d.data.data;
                districtData.count = d.data.count;
                districtData.endedCount = d.data.endedCount
                districtData.percentage = ((d.data.endedCount/districtData.count) * 100).toFixed(1);

                let districtStat = {}
                districtStat.count = d.data.count;
                districtStat.endedCount = d.data.endedCount
                districtStat.percentage = ((d.data.endedCount/districtData.count) * 100).toFixed(1);
                let districtInfo = DISTRICT_LIST.find(district => district.chiKey === d.data.district);
                districtStat.district = districtInfo.id;
                districtStat.name = districtInfo.text;
                districtStat.latlng = districtInfo.latlng;
                districtStat.zoom = districtInfo.zoom;


                districtStatDataList.push(districtStat);
                buildingData.push(districtData);
            })
            setdistrictStatDataList(districtStatDataList);
            setQuarantineBuildingData(buildingData);

            let dataByVersionCopy = Object.assign({},dataByVersion);
            dataByVersionCopy[versionList.length] = {
                districtStatData: districtStatDataList,
                buildingData: buildingData
            }
            
            setDataByVersion(dataByVersionCopy)
            setVersion(versionList.length)
            
        }))
    }, [versionList])*/

    const classes = useStyles();
    const NEbounds = [22.5829, 115.05]
    const SWbounds = [22.0907, 113.2]
    const bounds = [NEbounds, SWbounds]
    const onMarkerClicked = (building) => {
        setCurrentCard(building)
    }
    const handleCloseCard = () => {
        setCurrentCard(null);
    }
    const handleFilterFabClicked = () => {
        setCurrentCard(null);
        setFilterPanelOpen(true)
        if(width <= 600){
            setTimelinePanelOpen(false)
        }
    }

    const handleFilterFabClose = () => {
        setFilterPanelOpen(false)
    }

    const handleTimelineFabClose = () => {
        setTimelinePanelOpen(false)
    }

    const handleTimelineFabClicked = () => {
        setTimelinePanelOpen(true)
        if(width <= 600){
            setFilterPanelOpen(false)
        }
    }

    const handleSetnotEndedOnly = (notEndedOnly) => {
        setShowLoader(true);
        setTimeout(()=>{
            console.log("set not ended only: "+Date.now());
           setnotEndedOnly(notEndedOnly) 
        },300);
        
    }
    const hideLoader = () => {
        console.log("hideLoader");
        setTimeout(()=>{ 
            setShowLoader(false);
        },300)
        
    }

    const onTimelineClicked = (version) => {
        //console.log(version);
        setShowLoader(true); 
        ReactDOM.unstable_batchedUpdates(()=>{
            setCurrentCard(null);
            
            setVersion(version+1);            
        })

        
    }

    const onMapClicked = () => {
        setFilterPanelOpen(false)
    }

    const handleReport = (id) => {
        setShowLoader(true);
        axios.post('https://api.antivirushk.com/reportQtError', {
            id: ""+id
          })
          .then(function (response) {
            console.log(response);
            setShowLoader(false);
          })
          .catch(function (error) {
            console.log(error);
            setShowLoader(false);
          });
    }

    const buttonText = notEndedOnly ? "顯示全部" : "只顯示未完成隔離大廈"

    const dataAttribution = version > 4 ? "" : `, 
    Data from <a target="_blank" href="https://www.facebook.com/orix.auyeung/posts/10158212828713921">Orix Au Yeung</a>`

    const attribution = `&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> 
    contributors © <a target="_blank" href="https://carto.com/attributions">CARTO</a>${dataAttribution}`

    return(
        <div className={classes.mapRoot}>
            <div>
                <Map center={[ 22.5057, 114.1272]} onClick={onMapClicked} zoom={11} minZoom={10} maxZoom={18} maxBounds={bounds} ref={mapRef}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution={attribution}
                    />
                    <MapMarkerMemo
                    notEndedOnly={notEndedOnly}
                    onMarkerClicked={onMarkerClicked}  
                    quarantineBuildingData={quarantineBuildingData}
                    hideLoader={hideLoader}
                    version1={version1}/>
                </Map>
            </div>
            {
                currentCard != null ?
                <div className={classes.currentCard}>
                    <div className={classes.cardBar}>
                        <CloseIcon className={classes.closeCardButton} onClick={handleCloseCard}/>
                    </div>
                    <div className={classes.cardContent}>
                        <BuildingCard building={currentCard}/>  
                    </div>
                    {/* <div className={classes.reportBtn} onClick={()=>handleReport(currentCard.id)}>
                        <ErrorIcon />
                    </div> */}
                </div> : ""
            }

            {
                !filterPanelOpen ? 
                <Fab className={classes.filter} onClick={handleFilterFabClicked}>
                    <DataUsageIcon />
                </Fab>: ""
            }
            
            {
                filterPanelOpen ? 
                <StatPanel 
                districtStatDataList={districtStatDataList} 
                onClosePanel={handleFilterFabClose}
                notEndedOnly={notEndedOnly}
                /> : ""
            }
            {
                !timelinePanelOpen && width <= 600? 
                <Fab className={classes.timelineFab} onClick={handleTimelineFabClicked}>
                    <TimelineIcon />
                </Fab>: ""
            }
            {
                timelinePanelOpen || width > 600 ?
                <div><Button className={classes.toggleNotEndedOnlyButton} onClick={()=>handleSetnotEndedOnly(!notEndedOnly)}>
                {buttonText}
                </Button>
                <VersionTimeline versionList={versionList} onTimelineClicked={onTimelineClicked}/> </div>: ""
            }
            {
                timelinePanelOpen && width <= 600 ?
                <div className={classes.closeTimelinePanel}>
                    <CloseIcon className={classes.closeTimelineButton} onClick={handleTimelineFabClose}/>
                </div> : ""
            }
            <Loader show={showLoader}/>
            
        </div>

    )
}