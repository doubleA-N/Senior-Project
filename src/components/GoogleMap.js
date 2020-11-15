import React from 'react';
import {Map, TileLayer, Popup, Marker} from "react-leaflet";
import { Icon } from "leaflet";
// import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import '../CSS/App.css';
import '../CSS/AddData.css';
import 'bootstrap/dist/css/bootstrap.css';
import { geolocated } from "react-geolocated";

const map = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [30, 30]
});


class GoogleMap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
         
        };
      }
      
      componentDidMount() {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function(position) {
            
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          });
        }
      }
    
    render() {
      return !this.props.isGeolocationAvailable
        ? <div>Your browser does not support Geolocation</div>
        : !this.props.isGeolocationEnabled
          ? <div>Geolocation is not enabled</div>
          : this.props.coords
            ? 
            <Map className='map' center={[13.76, 100.51]} zoom={5} onClick={this.handleClick}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
                <Marker 
                position={[this.props.coords.latitude , this.props.coords.longitude]}
                icon={map}
                 >
                <Popup position={this.state.coords}>
                    สถานที่ปักหมุด: <br/>
                                 Latitude:<pre>{JSON.stringify(this.props.coords.latitude, null, 2)}</pre>
                                 Longitude:<pre>{JSON.stringify(this.props.coords.longitude, null, 2)}</pre>
                    </Popup>
                </Marker>
                    
            </Map>
            : <div>Getting the location data&hellip; </div>;
    
          }

    
}
export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GoogleMap);
