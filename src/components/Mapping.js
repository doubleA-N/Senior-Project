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
                        <p className='card-subtitle ml-3 mb-2 mr-3'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {popup.topic}</p>
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