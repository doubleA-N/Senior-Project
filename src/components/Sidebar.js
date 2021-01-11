import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import '../CSS/App.css';
import '../CSS/Sidebar.css';
import img from '../img/profile-user.png';
import google from '../img/google.png';
import folder from '../img/folder.png';
import report from '../img/write-letter.png';
import list from '../img/listing-option.png';
import analyze from '../img/analytics.png';
import user from '../img/user-profile (1).png';
import { auth, provider } from '../data/firebase';

// const history = useHistory();

class sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null 
          }
          this.login = this.login.bind(this);
          this.logout = this.logout.bind(this);
      } 
      handleChange(e){
  
      }

  
      logout(){
          auth.signOut()
          .then(() => {
              this.setState({
                  user:null                
              });
              
          })
      }
      login() {
          auth.signInWithPopup(provider)
          .then((result => {
              const user = result.user;
              this.setState({
                  user, 
              });
          }))
      }
  
      componentDidMount() {
          auth.onAuthStateChanged((user) => {
              if (user) {
                  this.setState({user});
              }
          })
      }
    render() {
       
        return (
        <Router>
            <div className="sidenav">
                    
                    {this.state.user ?
                        <div>
                        <img className ='img-sidebar' src={this.state.user.photoURL} />
                        <p className='profile-name'>{this.state.user.displayName}</p>
                        <div className='list'>
                        <a className ='sidebar-link' href="/"><img className ='logo' src={folder}/>หน้าแรก</a>
                        <a className='sidebar-link' href='/AddData'><img className ='logo' src={report}/>แจ้งปัญหา</a>
                        <a className ='sidebar-link' href="/Content"><img className ='logo' src={list}/>ดูข้อมูลของปัญหา</a>
                        <a className ='sidebar-link' href="#"><img className ='logo' src={analyze}/>วิเคราะห์ปัญหา</a>
                        <a className ='sidebar-link' href="/Profile"><img className ='logo' src={user}/>โปรไฟล์ของคุณ</a>
                        </div>
                        <a className='button-logout' onClick={this.logout}>ออกจากระบบ</a>
                        </div>
                        :
                        <div>
                        <img className ='img-sidebar' src={img}/>
                        <p className ='profile-name'>คุณยังไม่ได้เข้าสู่ระบบ</p>
                        <a className='button3' onClick={this.login}>เข้าสู่ระบบด้วย<img className ='google' src={google}/></a>
                        <div className=''>
                        <a className ='sidebar-link' href="/"><img className ='logo' src={folder}/>หน้าแรก</a>
                        <a className='sidebar-link' href='/AddData'><img className ='logo' src={report}/>แจ้งปัญหา</a>
                        <a className ='sidebar-link' href="/Content"><img className ='logo' src={list}/>ดูข้อมูลของปัญหา</a>
                        <a className ='sidebar-link' href="#"><img className ='logo' src={analyze}/>วิเคราะห์ปัญหา</a>
                        <a className ='sidebar-link' href="/Profile"><img className ='logo' src={user}/>โปรไฟล์ของคุณ</a>
                        </div>
                        </div>
                    }
                    
                  
                  
            </div>
        </Router>
                 
            
            
                
            
        );
    }
}

export default sidebar;