import React from 'react';
import '../CSS/App.css';
import '../CSS/Sidebar.css';
import img from '../img/hipster.png';
import folder from '../img/folder.png';
import report from '../img/write-letter.png';
import list from '../img/listing-option.png';
import analyze from '../img/analytics.png';
import setting from '../img/settings.png';

class sidebar extends React.Component {
    render() {
        return (
            <div>
                <div class="sidenav">
                <img class ='img-sidebar' src={img}/>
                <p class ='profile-name'>UserName..</p>
                <a class ='profile-sidebar'href="#">โปรไฟล์ของคุณ</a>
                <a class ='sidebar-link' href="/"><img class ='logo' src={folder}/>หน้าแรก</a>
                <a class ='sidebar-link' href="#"><img class ='logo' src={report}/>แจ้งปัญหา</a>
                <a class ='sidebar-link' href="#"><img class ='logo' src={list}/>ดูข้อมูลของปัญหา</a>
                <a class ='sidebar-link' href="#"><img class ='logo' src={analyze}/>วิเคราะห์ปัญหา</a>
                <a class ='sidebar-link' href="#"> <img class ='logo' src={setting}/>การตั้งค่า</a> 
                <a href="something" class="button3">ออกจากระบบ</a>

                </div>  
            </div>
            
        );
    }
}

export default sidebar;