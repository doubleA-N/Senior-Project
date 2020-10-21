import React, { useEffect, useState } from 'react';
import './CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from './components/Sidebar';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
// import * as Testdata from "./data/Testdata.json";

import { db, auth } from './data/firebase'

function App() {

  const [problems, setProblems] = useState(null)
  const [popup, setPopup] = useState(null)
  const map = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [30, 30]
  });

  // useEffect(() => {
  //   console.log('problem', problems)
  // }, [problems])

  function setActiveProblem(problem_id) {
    console.log(problem_id, 'set active problem')
    setProblems(prev => prev.map(el => {
      if (el.problem_id === problem_id) {
        return { ...el, popup: true }
      }
      return { ...el, popup: false }
    }))
  }

  useEffect(() => {
    db.collection('problems')
      .get()
      .then(snapshot => {
        const problems_data = []
        snapshot.forEach(doc => {
          const data = doc.data()
          problems_data.push(data)
        })
        setProblems(problems_data.map(el => ({ ...el, popup: false })))
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className='App'>
      <h3 className='App-link'>หน้าแรก</h3>
      <form>
        <input class='input' type="text" name="search" placeholder="Search.." />
      </form>
      <hr className='App-line'></hr>
      <Sidebar />

      <Map center={[13.76, 100.51]} zoom={5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
          {problems && problems.length != 0 && problems.map(problem => {
            // console.log(problem.problem_id + String(problem.popup))
            return (
              <Marker
                key={problem.problem_id}
                position={[
                  problem.location.latitude,
                  problem.location.longitude
                ]}
                onClick={() => {
                  setPopup(problem)
                }}
                icon={map}
              >
              </Marker>
            );
          })}
        </MarkerClusterGroup>
        {
          popup && (
            <Popup
              position={[
                popup.location.latitude,
                popup.location.longitude,
              ]
              }
              onClose={() => {
                setPopup(null);
              }}
            >
              <div>
                <h2>{popup.name}</h2>
                <p>{popup.description}</p>
              </div>
            </Popup>
          )
        }
      </Map>

    </div>
  );
}

export default App;
