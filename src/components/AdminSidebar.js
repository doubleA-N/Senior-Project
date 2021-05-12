import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import '../CSS/App.css';
import '../CSS/Sidebar.css';
import folder from '../img/folder.png';
import report from '../img/write-letter.png';
import list from '../img/listing-option.png';
import analyze from '../img/analytics.png';
import user from '../img/user-profile (1).png';
import img from '../img/profile-user.png';

class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null 
          }
         
      } 
  
      componentDidMount() {
         
      }
    render() {
       
        return (
        <Router>
            <div className="sidenav">
                    
                        <div>
                        <img className ='img-sidebar' src={img} />
                        <p className='profile-name'>User: PO123</p>
                        <p className='profile-name'>Role: กรมตำรวจ</p>
                        <a className='button-logout' href="/" onClick={this.logout}>ออกจากระบบ</a>
                        </div>

                        {/* <div>
                        <img className ='img-sidebar' src={img}/>
                        <p className ='profile-name'>คุณยังไม่ได้เข้าสู่ระบบ</p>
                        <a className='button3' onClick={this.login}>เข้าสู่ระบบด้วย<img className ='google' src={google}/></a>
                        <div className=''>
                        <a className ='sidebar-link' href="/"><img className ='logo' src={folder}/>หน้าแรก</a>
                        <a className='sidebar-link' href='/AddData'><img className ='logo' src={report}/>แจ้งปัญหา</a>
                        <a className ='sidebar-link' href="/Content"><img className ='logo' src={list}/>ดูข้อมูลของปัญหา</a>
                        <a className ='sidebar-link' href="/Visualize"><img className ='logo' src={analyze}/>วิเคราะห์ปัญหา</a>
                        <a className ='sidebar-link' href="/Profile"><img className ='logo' src={user}/>โปรไฟล์ของคุณ</a>
                        <a className ='for-admin' href="/AdminLogin">สำหรับเจ้าหน้าที่</a>
                        </div>
                        </div> */}
                    
                    
                  
                  
            </div>
        </Router>
        );
    }
}

export default AdminSidebar;