import React, { useEffect, useState } from 'react';
import { db, auth } from '../data/firebase'
import { Map, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
// import GoogleMapReact from 'google-map-react'

import '../CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';

function Mapping() {
    // const [problems, setProblems] = useState(null)
    const [popup, setPopup] = useState(false);
    console.log(popup)
    const [news_thairath, setNewsthairath] = useState(null);

    const map = new Icon({
      iconUrl: "/marker.svg",
      iconSize: [30, 30]
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

    // useEffect(() => {
    //   db.collection('problems')
    //     .get()
    //     .then(snapshot => {
    //       const problems_data = []
    //       snapshot.forEach(doc => {
    //         const data = doc.data()
    //         problems_data.push(data)
    //       })
    //       setProblems(problems_data.map(el => ({ ...el, popup: false })))
    //     })
    //     .catch(error => console.log(error))
    // }, [])
 
    return(
        
        <div className='pl-4 full-screen'>
        <div className='row mx-0'>
        <h3 className='App-link'>หน้าแรก</h3>
        </div>
        
        <div className='row mx-0'>
            <div className='col-8'>
                <Map center={[13.76, 100.51]} zoom={5}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MarkerClusterGroup>
                    {news_thairath && news_thairath.length !== 0 && news_thairath.map(problem => {
                         
                        return (
                        
                        <Marker 
                            // key={problem.province}
                            position={[
                            problem.location[0],
                            problem.location[1]
                            ]}
                            onClick = {() => 
                            setPopup(problem)}
                            
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
            <h4>{popup.name} </h4>
                <h4>{popup.news_name} </h4> 
                <h5>{popup.description}</h5>
                <h6>{popup.provice}</h6>
                <a href = {popup.news_url}>{popup.news_url}</a>
                  
            </div> 
        </div>
        
        
    </div>
    )
}

export default Mapping;