import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import AddData from './AddData'
// import { NavLink, Route, Router } from 'react-router-dom'
import '../CSS/App.css';
import '../CSS/Sidebar.css';
import { Link } from 'react-router-dom';
import img from '../img/hipster.png';
import folder from '../img/folder.png';
import report from '../img/write-letter.png';
import list from '../img/listing-option.png';
import analyze from '../img/analytics.png';
import setting from '../img/settings.png';

class sidebar extends React.Component {
    render() {
        return (
        <Router>
            <div className="sidenav">
                    <img className ='img-sidebar' src={img}/>
                    <p className ='profile-name'>UserName</p>
                    <a className ='profile-sidebar'href="#">โปรไฟล์ของคุณ</a>
                    <a className ='sidebar-link' href="/"><img className ='logo' src={folder}/>หน้าแรก</a>
                    <a className='sidebar-link' href='/AddData'><img className ='logo' src={report}/>แจ้งปัญหา</a>
                    <a className ='sidebar-link' href="#"><img className ='logo' src={list}/>ดูข้อมูลของปัญหา</a>
                    <a className ='sidebar-link' href="#"><img className ='logo' src={analyze}/>วิเคราะห์ปัญหา</a>
                    <a className ='sidebar-link' href="#"> <img className ='logo' src={setting}/>การตั้งค่า</a> 
                    <a href="something" className="button3">ออกจากระบบ</a>
                  
            </div>
        </Router>
                 
            
            
                
            
        );
    }
}

export default sidebar;