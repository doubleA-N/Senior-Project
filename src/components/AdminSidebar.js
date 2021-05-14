import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import '../CSS/App.css';
import '../CSS/Sidebar.css';
import '../CSS/AdminSidebar.css';
import report from '../img/write-letter.png';
import list from '../img/listing-option.png';
import wrong from '../img/document.png';
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
                            <div className='list'>
                            <a className ='sidebar-link' href="/CheckFakeNews"><img className ='logo' src={list}/>ข้อมูลปัญหาที่ยังไม่ได้ยืนยัน</a>
                            <a className ='sidebar-link' href="/TrueNews"><img className ='logo' src={report}/>ข้อมูลปัญหาที่ถูกต้อง</a>
                            <a className ='sidebar-link' href="/Fakenews"><img className ='logo' src={wrong}/>ข้อมูลปัญหาที่ไม่ถูกต้อง</a>
                            
                            </div>
                        <a className='button-logout logout-but ' href="/" onClick={this.logout}>ออกจากระบบ</a>
                        </div>                                    
            </div>
        </Router>
        );
    }
}

export default AdminSidebar;