import React, { useEffect, useState } from 'react';
import { db, auth } from '../data/firebase'
import { Map, Marker, TileLayer } from "react-leaflet";
import { Icon, marker } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import NewsContent from './NewsContent';
import '../CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import img from '../img/thairath.png'



function Mapping() {
    // const [problems, setProblems] = useState(null)
    const [popup, setPopup] = useState(false);
    const [news_thairath, setNewsthairath] = useState(null);
    const map = new Icon({
      iconUrl: "/marker.svg",
      iconSize: [25, 41]
    });
     
    useEffect(() => {
        db.collection('news_thairath')
        .get()
        .then(snapshot => {
            const news_data =[]
            snapshot.forEach(doc => {
                const data = doc.data()
                news_data.push(data)
            })
            setNewsthairath(news_data.map(el => ({...el, popup: false})))
        })
        .catch(error => console.log(error))
    }, [])
  
    
    return(
        
        <div className='full-screen'>
        <div className='row mx-0'>
        <h3 className='App-link'>หน้าแรก</h3>
        </div>

        <div className='App-line'>
        </div>

        <div className='row mx-0'>
            <div className='col-8'>
               
                <Map center={[13.76, 100.51]} zoom={5}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MarkerClusterGroup
                    // onClusterClick={
                    //     (cluster) => console.log('cluster child markers', cluster.layer.getAllChildMarkers())
                        
                    //   }
                    >
                    
                    {news_thairath && news_thairath.length !== 0 && news_thairath.map(problem => {
                        return (
                        
                        <Marker 
                            
                            //key={problem.province}
                            position={[
                            problem.location[0],
                            problem.location[1] 
                            
                            ]}
                          
                            onClick = {() => 
                            setPopup(problem)
                            }
                            
                            onClose={() => {
                            setPopup(null);
                            }}
                            icon={map}
                        >
                        </Marker>
                        
                        );
                    })}
                    </MarkerClusterGroup>
                </Map>
                
            </div> 
            <div className='col-4 App-link'>
            {popup == false && 
                
                <div className="card bg-light">
                <div className="card-header">รายละเอียดของปัญหา</div>
                 <div className="card-body">
                 <p className>กรุณาเลือกตำแหน่งของปัญหาบนแผนที่</p>
                 </div>                
                 </div>
            }
            {popup != false &&
            <div>
                
                    <div className="card card-content-size bg-light">
                    <div className="card-header">รายละเอียดของปัญหา</div>
                        {popup.name == 'Thairath' ?
                        <img className='ml-2 mt-2 news-img' src={img}/>
                        :
                        <img className='ml-2 mt-2 news-img' src={popup.photo}/>
                        }
                        
                        <h5 class="card-title ml-3 mt-2 mr-3">{popup.name} </h5>
                        <p class="card-subtitle ml-3 text-muted">{popup.person}</p>
                        <p class='card-text ml-3'>{popup.news_name}</p>
                        {popup.news_name.includes("ฝุ่น") || popup.news_name.includes("ฝนตก") ||
                        popup.news_name.includes("ร้อน") || popup.news_name.includes("หนาว") ||
                        popup.news_name.includes("อากาศ")?
                                <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหา: สภาพแวดล้อม</p>                               
                                :                               
                                popup.news_name.includes("แทง") || popup.news_name.includes("ยิง") || 
                                popup.news_name.includes("โจร") || popup.news_name.includes("ฆ่า") ||
                                popup.news_name.includes("ปล้น") || popup.news_name.includes("ชิง") ||
                                popup.news_name.includes("ข่มขืน") || popup.news_name.includes("โกง")?
                                  <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหา: อาชญากรรม </p>
                                  :
                                  popup.news_name.includes("ไฟไหม้") || popup.news_name.includes("น้ำท่วม") 
                                    || popup.news_name.includes("น้ำป่าไหลหลาก")?
                                    <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหา: ภัยพิบัติ </p>
                                    :
                                    popup.news_name.includes("โควิด") || popup.news_name.includes("covid")?
                                      <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหา: COVID-19 </p>
                                      :
                                      popup.news_name.includes("รถติด") || popup.news_name.includes("จราจร")?
                                        <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหา: การจราจร </p>
                                        :
                                        popup.news_name.includes("เลือกตั้ง") || popup.news_name.includes("ม็อบ") ||
                                        popup.news_name.includes("นายก") || popup.news_name.includes("รัฐ")?
                                          <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหา: การเมือง </p>
                                          :
                                          popup.news_name.includes("เลือกตั้ง") || popup.news_name.includes("ม็อบ") ||
                                          popup.news_name.includes("นายก") || popup.news_name.includes("รัฐ")?
                                          <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหา: การเมือง </p>
                                            :
                                            popup.news_name.includes("รถชน") || popup.news_name.includes("ล้ม") ||
                                            popup.news_name.includes("คว่ำ")?
                                            <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหา: อุบัติเหตุ </p>
                                              :
                                              <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหา: ข่าวสังคม </p>

                        }
                        <p class="card-subtitle ml-3  text-muted">{popup.province}</p>
                        {popup.news_url &&
                        <a class='card-link ml-3 mb-2' href = {popup.news_url}>รายละเอียดเพิ่มเติม...</a>
                        }
                    </div>                   
                </div>
           
    
            }
            
                  
            </div>
        
        </div>
        <div className='row mx-0'>
        <NewsContent />
        </div>
        
    </div>
    )
}

export default Mapping;