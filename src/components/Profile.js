import React from 'react';
import { db, auth} from '../data/firebase'
// import '../CSS/App.css';
import '../CSS/Profile.css';
import 'bootstrap/dist/css/bootstrap.css';
import worry from '../img/worried.png'
import bin from "../img/delete.png";
import check from '../img/check.png'
import close from '../img/close.png'
import verify from '../img/verify.png'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
          user: null,
          fullName: "",
          id:""         
        };
      }
     
      componentDidMount() {
        const fullName = localStorage.getItem('fullName') 
        const id = localStorage.getItem('id')
        this.setState({fullName: fullName, id:id})
        console.log('myData',fullName,id)
        
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({user})
            
          }
        
        db.collection('news_thairath')
        .where('uid','==', this.state.user.uid)
        .orderBy("news_date", "desc")
        .get()
        .then( snapshot => {
            const news_thairath = []
            snapshot.forEach(doc => {
                // const data = doc.data()             
                news_thairath.push({ id: doc.id,
                data: doc.data()})
            })
            this.setState({news_thairath:news_thairath,
                          })
        }).catch(error => console.log(error))
    })
      }

      clear(){
        localStorage.removeItem('fullName') 
        localStorage.removeItem('id')
        console.log('clear')
      }

     removeData(id){
       console.log(id)
      confirmAlert({
        // title: 'คุณยืนยันที่จะลบปัญหาที่เกิดขึ้นหรือไม่',
        message: 'คุณยืนยันที่จะลบปัญหาที่เกิดขึ้นหรือไม่',
        buttons: [
          {
            label: 'ใช่! ลบเลย',
            onClick: () => {
              
                 db.collection("news_thairath")
                .doc(id)
                .delete()
                .then(() => {
                  console.log("Document successfully deleted!");
                  window.location = '/Profile'
              }).catch((error) => {
                  console.error("Error removing document: ", error);
              });
            }
          },
          {
            label: 'ไม่'
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
        <div className='profile-main'>
          <div className='App-link'>
          <h3 className='heading'>โปรไฟล์ของคุณ</h3>
          <div  className='App-line'></div>
          {this.state.user?
            <div className='mt-4'>
                 {/* <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">ยินดีต้อนรับ!</h4>
                  <p>โปรไฟล์ของคุณที่จะปรากฏแก่สาธารณะจะมีเพียงแค่ชื่อและรูปภาพเท่านั้น</p>
                  <hr></hr>
                  <p className="mb-0">มั่นใจได้เลยว่าข้อมูลของคุณจะปลอดภัย!</p>
                </div> */}

                <div className='row'> 
                    <div className='col-4'>
                        <div className="profile-card-4"><img src={this.state.user.photoURL} className="img img-responsive" />
                                <div className="profile-content">
                                <div className="profile-name">{this.state.user.displayName}</div>
                                <div className="row">
                                    <div className="col-xs-4">
                                        <div className="profile-overview">
                                            <h6>ชื่อ: {this.state.fullName}</h6>
                                            <h6>เลขบัตรประชาชน: {this.state.id}</h6>
                                            <h6>ชื่อผู้ใช้ e-mail: {this.state.user.displayName}</h6>
                                            <h6>e-mail: {this.state.user.email}</h6>
                                            {/* <a onClick={this.clear}>clear</a> */}
                                        </div>
                                    </div>
                                    
                                </div>
                                </div>
                
                        </div>
                    </div>
                    <div className='col-8'>
                        <Alert className='text-warn' variant='warning'>
                        * ปัญหาจากการรายงานของคุณจะถูกตรวจสอบจากหน่วยงานที่เกี่ยวข้อง
                        </Alert>
                        <div className="card bg-card mb-3 card-size">
                        <div className="card-header">โพสของคุณ</div>
                        {this.state.news_thairath && 
                        this.state.news_thairath.map(content => {
                         
                          return(
                                <div>
                                        
                                        <div 
                                        key ={content.id}
                                        className="card-body pt-3 pb-0">
                                        <img className='news-img' src={content.data.photo}/>
                                        <p className='news'>{content.data.name}</p>
                                        
                                        {content.data.status == '0' ?
                                          <Button size='sm' className='status' variant="warning" >
                                          
                                           กำลังตรวจสอบความถูกต้อง
                                          </Button>
                                        : content.data.status == '1' ?
                                          <Button size='sm' className='status' variant="success">
                                          <img src={check} /> ข้อมูลปัญหาถูกต้อง
                                          <p className='verify'> Verified by: {content.data.verify}<img src={verify} /></p>
                                          </Button>
                                          :
                                            <Button size='sm' className='status' variant="danger">
                                            <img src={close} /> ข้อมูลปัญหาไม่ถูกต้อง
                                            </Button>
                                        }
                                                                               
                                        <p className='mt-1 mb-2'>{content.data.news_name} <img className='bin-button' title='ลบปัญหานี้' src={bin} 
                                        onClick={() => this.removeData(content.id)}
                                        /></p>
                                        <p className='time'>{content.data.news_date}</p>
                                        <p className='time'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {content.data.topic}</p>                   
                                                                             
                                        <hr className='mb-0 mt-0 hr-news'></hr>
                                        </div> 
                                                                         
                                    </div>    
                            )
                    })}
                        </div>
                    </div>
              
                </div> 
            </div>
               :
               <div className='mt-4'>
                 <div className="alert alert-danger" role="alert">
                  <h4 className="alert-heading">คุณยังไม่ได้เข้าสู่ระบบ!</h4>
                  <p>โอ้ะโอ...ดูเหมือนว่าคุณยังไม่เข้าสู่ระบบ โปรดเข้าสู่ระบบก่อนเพื่อมาดูโปรไฟล์ของคุณ</p>
                  <hr></hr>
                  <p className="mb-0">การเข้าสู่ระบบนั้นสุดแสนจะง่าย ใช้บัญชี Google ของคุณสิ!</p>
                </div>
                <div className='mt-5 center'>
                <img src={worry}/>
                </div>
               </div>
               
               }
          </div>
          
        
        </div>
          );
        }
     }
export default Profile;
