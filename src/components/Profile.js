import React from 'react';
import { db, auth} from '../data/firebase'
// import '../CSS/App.css';
import '../CSS/Profile.css';
import 'bootstrap/dist/css/bootstrap.css';
import worry from '../img/worried.png'
import bin from "../img/delete.png";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
          user: null,
         
        };
      }
     
      componentDidMount() {
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
                 <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">ยินดีต้อนรับ!</h4>
                  <p>โปรไฟล์ของคุณที่จะปรากฏแก่สาธารณะจะมีเพียงแค่ชื่อและรูปภาพเท่านั้น</p>
                  <hr></hr>
                  <p className="mb-0">มั่นใจได้เลยว่าข้อมูลของคุณจะปลอดภัย!</p>
                </div>

                <div className='row'> 
                    <div className='col-4'>
                        <div className="profile-card-4"><img src={this.state.user.photoURL} className="img img-responsive" />
                                <div className="profile-content">
                                <div className="profile-name">{this.state.user.displayName}</div>
                                <div className="row">
                                    <div className="col-xs-4">
                                        <div className="profile-overview">
                                            <h6>ชื่อ: {this.state.user.displayName}</h6>
                                            <h6>e-mail: {this.state.user.email}</h6>
                                        </div>
                                    </div>
                                    
                                </div>
                                </div>
                
                        </div>
                    </div>
                    <div className='col-8'>
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
                                        <p className='mt-1 mb-2'>{content.data.news_name}<img className='bin-button' title='ลบปัญหานี้' src={bin} 
                                        onClick={() => this.removeData(content.id)}
                                        /></p>
                                        {content.data.news_name.includes("ฝุ่น") || content.data.news_name.includes("ฝนตก") ||
                                        content.data.news_name.includes("ร้อน") || content.data.news_name.includes("หนาว") ||
                                        content.data.news_name.includes("อากาศ")?
                                                <p className='card-subtitle'>ประเภทของปัญหา: สภาพแวดล้อม</p>                               
                                                :                               
                                              content.data.news_name.includes("แทง") || content.data.news_name.includes("ยิง") || 
                                              content.data.news_name.includes("โจร") || content.data.news_name.includes("ฆ่า") ||
                                              content.data.news_name.includes("ปล้น") || content.data.news_name.includes("ชิง") ||
                                              content.data.news_name.includes("ข่มขืน") || content.data.news_name.includes("โกง")?
                                                <p className='card-subtitle'>ประเภทของปัญหา:อาชญากรรม </p>
                                                :
                                                  content.data.news_name.includes("ไฟไหม้") || content.data.news_name.includes("น้ำท่วม") 
                                                  || content.data.news_name.includes("น้ำป่าไหลหลาก")?
                                                  <p className='card-subtitle'>ประเภทของปัญหา: ภัยพิบัติ </p>
                                                  :
                                                    content.data.news_name.includes("โควิด") || content.data.news_name.includes("covid")?
                                                    <p className='card-subtitle'>ประเภทของปัญหา: COVID-19 </p>
                                                    :
                                                      content.data.news_name.includes("รถติด") || content.data.news_name.includes("จราจร")?
                                                      <p className='card-subtitle'>ประเภทของปัญหา: การจราจร </p>
                                                      :
                                                        content.data.news_name.includes("เลือกตั้ง") || content.data.news_name.includes("ม็อบ") ||
                                                        content.data.news_name.includes("นายก") || content.data.news_name.includes("รัฐ")?
                                                        <p className='card-subtitle'>ประเภทของปัญหา: การเมือง </p>
                                                        :
                                                        content.data.news_name.includes("เลือกตั้ง") || content.data.news_name.includes("ม็อบ") ||
                                                        content.data.news_name.includes("นายก") || content.data.news_name.includes("รัฐ")?
                                                        <p className='card-subtitle'>ประเภทของปัญหา: การเมือง </p>
                                                          :
                                                          content.data.news_name.includes("รถชน") || content.data.news_name.includes("ล้ม") ||
                                                          content.data.news_name.includes("คว่ำ")?
                                                          <p className='card-subtitle'>ประเภทของปัญหา: อุบัติเหตุ </p>
                                                            :
                                                            <p className='card-subtitle'>ประเภทของปัญหา: ข่าวสังคม </p>

                                        }                
                                        <p className='time'>{content.data.news_date}</p>
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
