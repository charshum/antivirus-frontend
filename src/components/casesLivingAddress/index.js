import React, { useState, createRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "./style.css"
import CloseIcon from '@material-ui/icons/Close';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import axios from 'axios'
import { BuildingCardGen } from '../compulsoryQuarantine/BuildingCard';

const useStyles = makeStyles({
    root: {
        minWidth: '100%',
        marginTop: '20px'
    },mapRoot:{
        position: 'relative'
    },
    currentCard:{
      position: 'absolute',
      top: 20,
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
    item:{
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 20,
      minWidth: '100%'
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
    updateDate:{
        fontSize: 14,
        borderRadius: 10,
        padding: 10,
        position: 'absolute',
        bottom: 20,
        left: 30,
        zIndex: 1200,
        backgroundColor: '#ffffff',
        ['@media(max-width: 600px)']:{
            bottom: 80
        },
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    },
    dataLink:{
        marginLeft: 10
    }
})

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

const mapRef = createRef()


const buildingFields = [
    {
        key: 'chiAddr',
        title: '地址'
    },
    {
        key: 'district',
        title: '地區'
    },
    {
        key: 'caseNo',
        title: '相關確診/疑似/個案編號'
    }
]

export function CasesLivingAddress(props){
    const { height, width } = useWindowDimensions();
    const { data } = props;
    const [currentCard, setCurrentCard] = useState(-1);
    const classes = useStyles();
    const NEbounds = [22.5329, 115.0]
    const SWbounds = [22.0907, 113.2]
    const bounds = [NEbounds, SWbounds];
    const [displayData, setDisplayData] = useState([]);
    const [currentBuilding, setCurrentBuilding] = useState(null);
    const [updateDate, setUpdateDate] = useState('');
    const [dataLink, setDataLink] = useState('');

    const onMarkerClicked = (id) => {
        console.log(id);
        setCurrentCard(id);
        setCurrentBuilding(displayData[id])
    }

    const handleCloseCard = () => {
        setCurrentCard(-1);
        setCurrentBuilding(null);
    }

    useEffect(()=>{
        const map = mapRef.current
        if(map != null){
           //console.log(map)
           map.leafletElement.invalidateSize(); 
        }
    })

    useEffect(() => {
        axios.get("https://storage.googleapis.com/antivirus-data/cases_living_addr.json",{
        }).then((data)=>{
            setDisplayData(data.data.data);
        })
  
    }, []);

    useEffect(() => {
        axios.get("https://storage.googleapis.com/antivirus-data/cases_building_update_date.json",{
        }).then((data)=>{
            setUpdateDate(data.data.date);
            setDataLink(data.data.link)
        })
  
    }, []);


    return(
        <div className={classes.mapRoot}>
                <Map center={[ 22.5657, 114.0972]} zoom={11} minZoom={10} maxZoom={18} maxBounds={bounds} ref={mapRef}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors © <a target="_blank" href="https://carto.com/attributions">CARTO</a>'
                    />
                    <MarkerClusterGroup>
                    {Array.isArray(displayData) && displayData.map((building,i) => {
                        if(building.lat > 0){
                            return(
                                <Marker key={'b'+i} onClick={() => onMarkerClicked(i)} position={[building.lat, building.lng]}>
                                    <Tooltip>
                                        {building.chiAddr}
                                    </Tooltip>
                                </Marker>
                            )
                        }else{
                            return ("")
                        }

                    })}
                    </MarkerClusterGroup>
                </Map>
                {
                    currentBuilding ?  
                    <div className={classes.currentCard}>
                        <div className={classes.cardBar}>
                            <CloseIcon className={classes.closeCardButton} onClick={handleCloseCard}/>
                        </div>
                        <div className={classes.cardContent}>
                              <BuildingCardGen building={currentBuilding} displayFields={buildingFields}/>
                        </div>
                    </div> : ""
                }
                <div className={classes.updateDate}>
                    {`更新日期 - ${updateDate}`}
                    <a className={classes.dataLink} href={dataLink}>
                        {"資料來源"}
                    </a>
                </div>       
        </div>
    )

}