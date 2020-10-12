import React from 'react';
import './CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from './components/Sidebar';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import * as Testdata from "./data/Testdata.json";

function App() {
  const [activepoint, setActivepoint] = React.useState(null);
  const map = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [30 , 30]
  });
 
  return (
    <div className='App container-fluid'>
      <h3 className='App-link'>หน้าแรก</h3>
      <hr className='App-line'></hr>
    <Sidebar />
    <Map center={[13.76, 100.51]} zoom={6}>
    {Testdata.features.map(point => (
        <Marker
          key={point.properties.USER_ID}
          position={[
            point.geometry.coordinates[1],
            point.geometry.coordinates[0]
          ]}
          onClick={() => {
            setActivepoint(point);
          }}
          icon={map}
        />
      ))}

{activepoint && (
    <Popup
      position={[
        activepoint.geometry.coordinates[1],
        activepoint.geometry.coordinates[0]
      ]}
      onClose={() => {
        setActivepoint(null);
      }}
    >
      <div>
        <h2>{activepoint.properties.NAME}</h2>
        <p>{activepoint.properties.DESCRIPTION}</p>
      </div>
    </Popup>
  )}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>

    </div>
  );
}

export default App;
