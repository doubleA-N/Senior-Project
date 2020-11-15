import React from 'react';
import {Map, TileLayer, Popup, Marker} from "react-leaflet";
import { Icon } from "leaflet";
import { db, auth } from '../data/firebase'
import '../CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import GoogleMap from './GoogleMap';
import { geolocated } from "react-geolocated";

// import GoogleMap from './GoogleMap'

const MyMarker = props => {

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  return <Marker ref={initMarker} {...props} icon={map}/>
}
const map = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [30, 30]
});

let id = Math.random()*100

class AddData extends React.Component {
    constructor() {
        super();
        this.state = {
         name: "",
         description: "",
         currentPos: null
        };
        this.handleClick = this.handleClick.bind(this);
      }
      
    handleClick(e){
        this.setState({ currentPos: e.latlng });
        console.log(e.latlng)
    }
    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
           
        });
    }
    addUser = e => {
        
        e.preventDefault();
        // const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("news_thairath").add({
            id: id,
            name: this.state.name,
            news_name: this.state.description,
            
            location: JSON.parse(JSON.stringify([this.props.coords.latitude,this.props.coords.longitude]))
        });  
        this.setState({
        name: "",
        description: "",
       
        });
      };
    
    render() {
      return (
        <div>
          <h3 className='heading'>รายงานปัญหา</h3>
          <div className='App App-link center'>
        
        <form onSubmit={this.addUser}>
            
            <label>ชื่อของคุณ </label>
            <input
              class ='form-control'
              type="text"
              name="name"
              placeholder="input your name"
              onChange={this.updateInput}
              value={this.state.name}
            />
            <label for='report'>แจ้งปัญหาปัญหา </label>
            <textarea
              class ='form-control'
              id='report'
              type="text"
              name="description"
              placeholder="report here"
              onChange={this.updateInput}
              value={this.state.description}
            />
                  
            <button className='btn btn-danger btn-lg button' type="submit">แจ้งปัญหา</button>
          <label>ปัญหาของคุณเกิดขึ้นที่ใด</label>
          <GoogleMap {...this.props} />
        </form>
                
        </div>
        </div>
        
        
          );
        }
     }
     export default geolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    })(AddData);
