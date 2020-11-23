import React from 'react';
import { db, auth, provider } from '../data/firebase'
import '../CSS/App.css';
import '../CSS/Profile.css';
import 'bootstrap/dist/css/bootstrap.css';
import worry from '../img/worried.png'

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
        .get()
        .then( snapshot => {
            const news_thairath = []
            snapshot.forEach(doc => {
                const data = doc.data()
                news_thairath.push(data)
            })
            this.setState({news_thairath:news_thairath})
        }).catch(error => console.log(error))
    })
      }
    render() {
      return (
        <div>
          <div className='App-link'>
          <h3 className='heading'>โปรไฟล์ของคุณ</h3>
          <div  className='App-line'></div>
          {this.state.user?
            <div className='mt-4'>
                 <div class="alert alert-success" role="alert">
                  <h4 class="alert-heading">ยินดีต้อนรับ!</h4>
                  <p>โปรไฟล์ของคุณที่จะปรากฏแก่สาธารณะจะมีเพียงแค่ชื่อและรูปภาพเท่านั้น</p>
                  <hr></hr>
                  <p class="mb-0">มั่นในได้เลยว่าข้อมูลของคุณจะปลอดภัย!</p>
                </div>

                <div className='row'> 
                    <div className='col-4'>
                        <div class="profile-card-4"><img src={this.state.user.photoURL} class="img img-responsive" />
                                <div class="profile-content">
                                <div class="profile-name">{this.state.user.displayName}</div>
                                <div class="row">
                                    <div class="col-xs-4">
                                        <div class="profile-overview">
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
                                    
                                        <div className="card-body pt-3 pb-0">
                                        <img className='news-img' src={content.photo}/>
                                        <p className='news'>{content.name}</p>
                                        <p className='mt-1'>{content.news_name}</p>
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
                 <div class="alert alert-danger" role="alert">
                  <h4 class="alert-heading">คุณยังไม่ได้เข้าสู่ระบบ!</h4>
                  <p>โอ้ะโอ...ดูเหมือนว่าคุณยังไม่เข้าสู่ระบบ โปรดเข้าสู่ระบบก่อนเพื่อมาดูโปรไฟล์ของคุณ</p>
                  <hr></hr>
                  <p class="mb-0">การเข้าสู่ระบบนั้นสุดแสนจะง่าย ใช้บัญชี Google ของคุณสิ!</p>
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
