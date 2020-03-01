import React, { useState, createRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import './style.css'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { DISTRICT_LIST } from '../organizations'
import axios from 'axios'
import { BuildingCard } from './BuildingCard';
import CloseIcon from '@material-ui/icons/Close';




const useStyles = makeStyles(
    {
        mapRoot:{
            position: 'relative'
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
            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
            "& .MuiPaper-elevation1":{
                boxShadow: 'none'
            },
            ['@media(max-width: 600px)']:{
                top: 80,
                left: 'auto',
                right: 'auto'
            }
          }
    }
)

const mapRef = createRef()

const MapMarker = (props) => {
    const { quarantineBuildingData,  onMarkerClicked } = props;
    //console.log("render marker");
    return (
        <div>
            { quarantineBuildingData.map((districtData,i) => {
                return(
                    <MarkerClusterGroup key={i}>
                        {
                            Array.isArray(districtData.data) && districtData.data.map(building => {
                                if(building.lat > 0){
                                    return(
                                        <Marker key={building.id} onClick={() => onMarkerClicked(building)} position={[building.lat, building.lng]}>
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
    if(!prevProps.quarantineBuildingData || !nextProps.quarantineBuildingData){
        return false;
    }
    if(nextProps.quarantineBuildingData.length > prevProps.quarantineBuildingData.length){
        return false;
    }
    if(prevProps.quarantineBuildingData.length == nextProps.quarantineBuildingData.length){
        return true;
    }
}

const MapMarkerMemo = React.memo(MapMarker, areEqual);

export function CompulsoryQuarantineMap(){

    const [quarantineBuildingData, setQuarantineBuildingData] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);


    useEffect(()=>{
        const map = mapRef.current
        if(map != null){
           //console.log(map)
           map.leafletElement.invalidateSize(); 
        }
    })

    useEffect(() => {
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
            data.forEach(d => {
                let districtData = {}
                districtData.data = d.data.data;
                districtData.count = d.data.count;
                //console.log(districtData);
                buildingData.push(districtData);
            })
            setQuarantineBuildingData(buildingData);
        }))
  
    }, []);

    const classes = useStyles();
    const NEbounds = [22.5329, 115.0]
    const SWbounds = [22.0907, 113.2]
    const bounds = [NEbounds, SWbounds]
    const onMarkerClicked = (building) => {
        setCurrentCard(building)
    }
    const handleCloseCard = () => {
        setCurrentCard(null);
    }
    return(
        <div className={classes.mapRoot}>
            <div>
                <Map center={[ 22.5657, 114.0972]} zoom={11} minZoom={10} maxZoom={18} maxBounds={bounds} ref={mapRef}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors © <a target="_blank" href="https://carto.com/attributions">CARTO</a>, Data from <a target="_blank" href="https://www.facebook.com/orix.auyeung/posts/10158212828713921">Orix Au Yeung</a>'
                    />
                    <MapMarkerMemo onMarkerClicked={onMarkerClicked}  quarantineBuildingData={quarantineBuildingData}/>
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
                </div> : ""
            }
        </div>

    )
}