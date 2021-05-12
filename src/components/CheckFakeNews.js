import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import Button from 'react-bootstrap/Button'
import { confirmAlert } from 'react-confirm-alert'; // Import
import "../CSS/CheckFakeNews.css";
import { db, auth } from "../data/firebase";
import img from "../img/thairath.png";
import Modal from 'react-bootstrap/Modal'
import { Col, Row, Form } from 'react-bootstrap'
import AdminLogin from "./AdminLogin";

const map = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 41]
  });
  
    
// function MyModal() {
//     return (
//         <Modal
//         show= {true}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         >
//         <Modal.Header>
//         <Modal.Title id="contained-modal-title-vcenter">
//         คุณไม่มีสิทธิ์เข้าสู่หน้านี้
//         </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <h5>กรุณาเข้าสู๋ระบบด้วยบัญชีที่ได้รับอนุญาติ หรือกลับไปหน้าแรก</h5>
//         </Modal.Body>
//         <Modal.Footer>
//             <button className='btn btn-primary btn-lg' type="submit" onClick='/AddData'>กลับไปหน้าแรก</button>
//         </Modal.Footer>
//         </Modal>    
//     );
// }

class CheckFakeNews extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            user:null,
            password:null,
            news_thairath: null,
            
        };
      }
 
    

  componentDidMount() {


    // if(this.state.user == null){
    //     this.Login()
    // }
   
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //       if(user.email == 'aaeyysm@gmail.com'){
    //         this.setState({ user });
    //         console.log(user.email)
    //       } else {
    //             alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้')
    //             window.location = '/'
    //       }
        
    //   } else{
    //     alert('กรุณาเข้าสู่ระบบด้วยบัญชีที่ได้รับอนุญาติ')
    //     window.location = '/'
    //   }
    // });

    
    db.collection('news_thairath')
        .where('status', '==', 0)
        .orderBy("news_date", "desc")
        .get()
        .then( snapshot => {
            const news_thairath = []
            snapshot.forEach(doc => {
                // const data = doc.data()             
                news_thairath.push({ id: doc.id,
                data: doc.data()})
                // console.log(doc)
            })
            this.setState({news_thairath:news_thairath})
            
        }).catch(error => console.log(error))
  }


  UpdateChecked(id) {
    console.log(id)
    confirmAlert({
        // title: 'คุณยืนยันที่จะลบปัญหาที่เกิดขึ้นหรือไม่',
        message: 'คุณต้องการยืนยันปัญหาที่เกิดขึ้นหรือไม่',
        buttons: [
          {
            label: 'ใช่! ยืนยัน',
            onClick: () => {
                db.collection("news_thairath")
                .doc(id)
                .update({
                    "status" : 1,
                    "verify" : 'กรมตำรวจ'
                })
                .then(() => {
                  console.log("Document successfully Update!");
                  window.location = '/CheckFakeNews'
              }).catch((error) => {
                  console.error("Error removing document: ", error);
              });
            }
          },
          {
            label: 'กลับ'
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

  WrongChecked(id){
    confirmAlert({
        // title: 'คุณยืนยันที่จะลบปัญหาที่เกิดขึ้นหรือไม่',
        message: 'ปัญหานี้ไม่ถูกต้องใช่หรือไม่?',
        buttons: [
          {
            label: 'ใช่',
            onClick: () => {
                db.collection("news_thairath")
                .doc(id)
                .update({
                    "status" : 2
                })
                .then(() => {
                  console.log("Document successfully Update!");
                  window.location = '/CheckFakeNews'
              }).catch((error) => {
                  console.error("Error removing document: ", error);
              });
            }
          },
          {
            label: 'กลับ'
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
    
  render() {
    return (
    
      <div>
        {/* {this.state.user == null || this.state.password == null ?
        <AdminLogin />
        : */}
        <div className="App-link">
          <h3 className="heading">ตรวจสอบปัญหา</h3>
          <div className="App-line"></div>
                 
            <div className="">
              <div className="card bg-light mb-3 card-size-fake">
                <div className="card-header">ปัญหาทั้งหมด</div>
                {this.state.news_thairath &&
                  this.state.news_thairath.map((content) => {
                  
                    return (
                        <div className="card-body pt-3 pb-0">
                        {content.name == "Thairath" ? (
                        <img className="news-img" src={img} />
                        ) : (
                        <img className="news-img" src={content.data.photo} />
                        )}
                        <p className="name">{content.data.fullName}</p>
                        <Button className='status-button' variant="outline-danger" onClick={() => this.WrongChecked(content.id)}>ข้อมูลไม่ถูกต้อง</Button>
                        <Button className='status-button' variant="outline-success" onClick={() => this.UpdateChecked(content.id)}>ข้อมูลถูกต้อง</Button>
                        <p className="time-fake">เลขบัตรประชาชน:  {content.data.id}</p>
                        <p className="mt-1 mb-1">{content.data.news_name}</p>
                        <p className="card-subtitle mt-1">{content.data.province}</p>
                        <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {content.data.topic}</p>
                        <p className='time-fake'>เวลาที่แจ้งปัญหา: {content.data.news_date}</p>
                        
                        <p className='mb-0'>สถานที่ที่เกิดปัญหา:</p>
                       
                        <Map center={[
                            content.data.location[0],
                            content.data.location[1]]} zoom={16}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker 
                            key={content.id}
                            position={[
                            content.data.location[0],
                            content.data.location[1]]}
                            icon={map}
                            >
                            </Marker>        
                        </Map>
                        

                        <hr className="mb-0 mt-0"></hr>
                    </div>
                      
                    );
                  })}
              </div>
            </div>
            
        </div>
        {/* } */}
        
      </div>
    );
  }
}

export default CheckFakeNews;
