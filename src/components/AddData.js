import React  from 'react';
import { db, auth} from '../data/firebase'
import {Map, TileLayer, Popup, Marker} from "react-leaflet";
import { Icon } from "leaflet";
import Search from "react-leaflet-search";
import '../CSS/AddData.css';
import 'bootstrap/dist/css/bootstrap.css';
import { geolocated } from "react-geolocated";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const icon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [25, 41]
});


class AddData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        user: null,
        name: "",
        description: "",
        info: null,
        placename: null,
        latLng:null,
        
        };
      }

      componentDidMount() {
        
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({user})
          }
        })
        
      }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
           
        });
      
    }

    addUser = e => {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    const yyyy = date.getFullYear();
    let hh = date.getHours();
    let min = date.getMinutes();
    let sec  = date.getSeconds();
    if(dd<10){
      dd=`0${dd}`;
    }
    if(mm<10){
      mm=`0${mm}`
    }
    date = `${yyyy}/${mm}/${dd} ${hh}:${min}:${sec}`

    if(this.state.info){
      e.preventDefault();       
      db.settings({
        timestampsInSnapshots: true
    });
    // let timestamp = new firebase.firestore.Timestamp()
    

      let confirmData = ['ชื่อผู้ใช้: '+this.state.user.displayName
      ,'\n ปัญหาที่เกิดขึ้น:'+this.state.description,
      '\n เวลา:'+date,
      '\n location:'+ this.state.placename]
      
      confirmAlert({
        title: 'คุณยืนยันที่จะรายงานปัญหาที่เกิดขึ้นหรือไม่',
        message: confirmData,
        buttons: [
          {
            label: 'รายงานทันที',
            onClick: () => {
              db.collection("news_thairath").add({
                uid: this.state.user.uid,
                photo: this.state.user.photoURL,
                name: this.state.user.displayName,
                news_name: this.state.description,
                person: 'Normal User',
                location: JSON.parse(JSON.stringify([this.state.info.lat,this.state.info.lng])),
                news_date:date,
            }).then(() => {
              console.log("Document successfully add!");
              window.location = '/Profile'
              this.setState({
                name: "",
                description: "",
                info: null               
                });

              });  
            }
          },
          {
            label: 'กลับไปแก้ไข'
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        willUnmount: () => {},
        afterClose: () => {
        },
        onClickOutside: () => {}
      });

    }else if(!this.state.info){
      e.preventDefault(); 
      db.settings({
        timestampsInSnapshots: true
    });
      confirmAlert({
        // title: 'คุณยืนยันที่จะรายงานปัญหาที่เกิดขึ้นหรือไม่',
        message: 'คุณยังไม่เลือกสถานที่ที่เกิดปัญหา',
        buttons: [
          {
            label: 'ใช้ตำแหน่งปัจจุบันของฉัน',
            onClick: () => {
              if (!navigator.geolocation) {
                alert('Geolocation is not supported by your browser');
              } else {
                navigator.geolocation.getCurrentPosition((position) => {
                 this.setState({latLng: position.coords})
                      db.collection("news_thairath").add({
                        uid: this.state.user.uid,
                        photo: this.state.user.photoURL,
                        name: this.state.user.displayName,
                        news_name: this.state.description,
                        person: 'Normal User',
                        location: JSON.parse(JSON.stringify([this.state.latLng.latitude,this.state.latLng.longitude])),
                        news_date:date,
                    }).then(() => {
                      console.log("Document successfully add!");
                      window.location = '/Profile'
                      this.setState({
                        name: "",
                        description: "",
                        info: null               
                        });
                      });  
                console.log(this.state.latLng.latitude, this.state.latLng.longitude)
                }, () => {
                  alert('Unable to retrieve your location');
                });
              }
            }
          },
          {
            label: 'กลับไปแก้ไข'
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        willUnmount: () => {},
        afterClose: () => {
        },
        onClickOutside: () => {}
      });

    }
      };  
      
      
      customPopup(SearchInfo) {

        return (
          <Popup>
            <div>
              <p>I am a custom popUp</p>
              <p>
                latitude and longitude from search component:{" "}
                {SearchInfo.latLng.toString().replace(",", " , ")}
              </p>
              <p>Info from search component: {SearchInfo.info}</p>
              <p>
                {SearchInfo.raw &&
                  SearchInfo.raw.place_id &&
                  JSON.stringify(SearchInfo.raw.place_id)}
              </p>
            </div>
          </Popup>
        );
        
      }
     
    render() {
      return (
        <div className='Adddata-main'>
          <div className='App-link'>
          <h3 className='heading'>รายงานปัญหา</h3>
          <div  className='App-line'></div>
          {this.state.user?
            
            <form onSubmit={this.addUser}>
        
            <div className='form-center' >      
                 
                  <label for='report'>รายงานปัญหาของคุณ </label>
                  <textarea
                    class ='form-control'
                    id='report'
                    type="text"
                    name="description" 
                    placeholder="report here"
                    onChange={this.updateInput}
                    value={this.state.description}
                    required
                  />
                
                <div className='map-content'>
                <label className='text-content' for='map'>ปัญหาของคุณเกิดขึ้นที่ใด</label>
               
                <Map className='map' center={[13.76, 100.51]} zoom={5}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                                                
                        <Search
                        position="topleft"
                        inputPlaceholder="ค้นหาสถานที่"
                        zoom={13} // Default value is 10
                        showMarker={true}
                        showPopup={true}
                        openSearchOnLoad={false} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
                        closeResultsOnClick={true}
                        onChange={(info) => {this.setState({placename:info.info,info:info.latLng})}}
                        >

                          {(info) => 
                          (                                
                                <Marker 
                                position={info?.latLng}
                                icon = {icon}
                                >
                                  {console.log(info)}
                                  {this.customPopup(info)}
                                </Marker>
                            
                            )}            

                        </Search>           
            </Map>
            <label className='text-warn'>*คุณสามารถใช้ตำแหน่งปัจจุบันได้ด้วยการคลิ้กที่ปุ่มแจ้งปัญหา โดยไม่จำเป็นต้องเลือกสถานที่บนแผนที่</label>
                </div>
                
                <div className='button text-center'>
                <button className='btn btn-danger btn-lg' type="submit" onClick={this.send}>แจ้งปัญหา</button>
              </div>
              </div>
              </form>
               :
               <div className='mt-4'>
                 <div class="alert alert-danger" role="alert">
                  <h4 class="alert-heading">คุณยังไม่ได้เข้าสู่ระบบ!</h4>
                  <p>โอ้ะโอ...คุณจำเป็นต้องเข้าสู่ระบบเพื่อดำเนินการแจ้งปัญหา เพื่อที่เราจะได้ทราบปัญหาจากคุณ</p>
                  <hr></hr>
                  <p class="mb-0">การเข้าสู่ระบบนั้นสุดแสนจะง่าย ใช้บัญชี Google ของคุณสิ!</p>
                </div>

                <form onSubmit={this.addUser}>
                <div className='form-center' >      
                 
                  <label for='report'>รายงานปัญหาของคุณ </label>
                  <textarea
                  disabled
                    class ='form-control'
                    id='report'
                    type="text"
                    name="description"
                    placeholder="กรุณาเข้าสู่ระบบเพื่อรายงานปัญหา"
                    onChange={this.updateInput}
                    value={this.state.description}
                  />
                
                    <div className='map-content'>
                    </div>
                    <div className='button text-center'>
                      <button className='btn btn-danger btn-lg' type="submit" onClick={this.send} disabled>กรุณาเข้าสู่ระบบเพื่อรายงานปัญหา</button>
                    </div>
              </div>
              </form>

               </div>
               
               }
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
