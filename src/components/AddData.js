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
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

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
        topic: null,
        fullName: "",
        id:"",
        modalShow: true,
        };
        this.updateInput = this.updateInput.bind(this);
      }
    
    componentDidMount() {
        
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({user});
          }
        })
        const fullName = localStorage.getItem('fullName') 
        const id = localStorage.getItem('id')
        this.setState({fullName: fullName, id:id})
        console.log('myData',fullName,id)

      }

    updateInput = e => {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
        this.setState({
            [name]: value
           
        });
      
    }
    

    saveData = e => {
      e.preventDefault();
      localStorage.setItem('fullName', this.state.fullName);
      localStorage.setItem('id', this.state.id);
      // window.location = '/AddData'
      console.log(this.state.fullName,this.state.id)
    }

    addUser = e => {

    e.preventDefault();
            
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
    if(hh<10){
      hh=`0${hh}`
    }
    if(min<10){
      min=`${mm}`
    }
    if(sec<10){
      sec=`${mm}`
    }
    date = `${yyyy}/${mm}/${dd} ${hh}:${min}:${sec}`

    if(this.state.info){
      e.preventDefault();   
      db.settings({
        timestampsInSnapshots: true
    }); 
   
    fetch("https://flask-topic-prediction.herokuapp.com/predict", {
      // mode: 'no-cors',
      method:"POST",
      cache: "no-cache",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(this.state.description)
      }
    )
    .then(res => res.json())
    .then(data => {
    console.log(data.output)
    this.setState({topic: data.output});
    
    let confirmData = ['ชื่อผู้ใช้: '+this.state.fullName
    ,'\n เลขบัตรประชาชน:'+this.state.id
    ,'\n ปัญหาที่เกิดขึ้น:'+this.state.description,
    '\n เวลา:'+date,
    '\n location:'+ this.state.placename,
    '\n หัวข้อ:'+ this.state.topic]

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
                topic: this.state.topic,
                status: 0,
                fullName: this.state.fullName,
                id: this.state.id
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
        closeOnClickOutside: true
      });
    });

    }else if(!this.state.info){
      e.preventDefault(); 
      db.settings({
        timestampsInSnapshots: true
    });

    fetch("https://flask-topic-prediction.herokuapp.com/predict", {
      // mode: 'no-cors',
      method:"POST",
      cache: "no-cache",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(this.state.description)
      }
    ) .then(res => res.json())
      .then( data => {
      console.log(data)
      this.setState({topic: JSON.stringify(data.output)});
      
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
                        topic: this.state.topic,
                        status: 0,
                        fullName: this.state.fullName,
                        id: this.state.id
                    }).then(() => {
                      console.log("Document successfully add!");
                      window.location = '/Profile'
                      this.setState({
                        name: "",
                        description: "",
                        info: null               
                        });
                      });  
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
       
      });
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
            this.state.fullName && this.state.id ?
            
              <form onSubmit={this.addUser}>
                
                  <div className='form-center' > 
                    <label for='fullName'>ชื่อตามบัตรประชาชน </label>
                    <input 
                      class ='form-control'
                      id='fullName'
                      type="text"
                      name="fullName" 
                      placeholder="report here"
                      onChange={this.updateInput}
                      value={this.state.fullName}
                      />

                    <label for='idnum'>เลขบัตรประชาชน </label>
                    <input 
                      class ='form-control'
                      id='idnum'
                      type="text"
                      name="id" 
                      placeholder="report here"
                      onChange={this.updateInput}
                      value={this.state.id}
                      />
                     <Button className='save-button' variant="primary" 
                    size="sm"
                    onClick={this.saveData}
                    >
                      บันทึกไว้ภายหลัง
                    </Button>
                    <br /><br />
                    <h4 className='heading'>รายงานปัญหาของคุณ</h4>
                    <Alert className='text-warn' variant='warning'>
                    *ปัญหาจากการรายงานของคุณจะถูกตรวจสอบจากหน่วยงานที่เกี่ยวข้อง
                    </Alert>
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
           
                    <Map className='' center={[13.76, 100.51]} zoom={5}>
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
                                  
                                  {this.customPopup(info)}
                                </Marker>
                            
                            )}            

                        </Search>           
                    </Map>
       
                  </div>
                    <Alert className='text-warn' variant='warning'>
                    *คุณสามารถใช้ตำแหน่งปัจจุบันได้ด้วยการคลิ้กที่ปุ่มแจ้งปัญหาได้ทันที โดยไม่จำเป็นต้องเลือกสถานที่บนแผนที่
                    </Alert>
                    </div>
                    <div className='button'>
                      <button className='btn btn-danger btn-lg' type="submit" onClick={this.send}>แจ้งปัญหา</button>
                    </div>
                  
              </form>
            :
            <form onSubmit={this.addUser}>
                
                  <div className='form-center' > 
                    <label for='fullName'>ชื่อตามบัตรประชาชน </label>
                    <input 
                      class ='form-control'
                      id='fullName'
                      type="text"
                      name="fullName" 
                      placeholder="กรอกชื่อตามบัตรประชาชน"
                      onChange={this.updateInput}
                      value={this.state.fullName}
                      />

                    <label for='idnum'>เลขบัตรประชาชน </label>
                    <input 
                      class ='form-control'
                      id='idnum'
                      type="text"
                      name="id" 
                      placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                      onChange={this.updateInput}
                      value={this.state.id}
                      />
                    {/* <input 
                      type='checkbox' 
                      class="form-check-input ml-1" 
                      id="exampleCheck1"/>
                    <label className='ml-4' for="exampleCheck1">Remember me</label> */}
                    <Button className='save-button' variant="primary" 
                    size="sm"
                    onClick={this.saveData}>
                      บันทึกไว้ภายหลัง
                    </Button>
                    <br /><br />
                    <h4 className='heading'>รายงานปัญหาของคุณ</h4>
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
           
                    <Map className='' center={[13.76, 100.51]} zoom={5}>
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
                                 
                                  {this.customPopup(info)}
                                </Marker>
                            
                            )}            

                        </Search>           
                    </Map>
       
                  </div>
                    <Alert className='text-warn' variant='warning'>
                    *คุณสามารถใช้ตำแหน่งปัจจุบันได้ด้วยการคลิ้กที่ปุ่มแจ้งปัญหาได้ทันที โดยไม่จำเป็นต้องเลือกสถานที่บนแผนที่
                    </Alert>
                    </div>
                    <div className='button'>
                      <button className='btn btn-danger btn-lg' type="submit" onClick={this.send}>แจ้งปัญหา</button>
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
