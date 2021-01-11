import React from 'react';
import { db, auth, provider } from '../data/firebase'
import '../CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import GoogleMap from './GoogleMap';
import { geolocated } from "react-geolocated";


class AddData extends React.Component {
    constructor() {
        super();
        this.state = {
          // posts: [],
          // errMsg: '',
         user: null,
         name: "",
         description: "",

        //  currentPos: null
        };
      //  this.handleClick = this.handleClick.bind(this);
      }

      componentDidMount() {
        
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({user})
          }
        })
      }

      send() {
        alert("คุณได้แจ้งปัญหาเรียบร้อยแล้ว");
      }
    
    // handleClick(e){
    //     this.setState({ currentPos: e.latlng });
    //     console.log(e.latlng)
    // }
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
            uid: this.state.user.uid,
            photo: this.state.user.photoURL,
            name: this.state.user.displayName,
            news_name: this.state.description,
            person: 'Normal User',
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
                  />
                
                <div className='map-content'>
                <label className='text-content' for='map'>ปัญหาของคุณเกิดขึ้นที่ใด</label>
                <GoogleMap id='map' {...this.props} />
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
                    <label className='text-content' for='map'>ปัญหาของคุณเกิดขึ้นที่ใด</label>
                    <GoogleMap id='map' {...this.props} />
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
