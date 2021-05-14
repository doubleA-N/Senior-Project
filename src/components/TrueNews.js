import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "../CSS/CheckFakeNews.css";
import { db } from "../data/firebase";
import img from "../img/thairath.png";
import 'bootstrap/dist/css/bootstrap.css';

const map = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 41]
  });
  

class TrueNews extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            user:null,
            password:null,
            news_thairath: null,
            showModal:true,
        };
        
      }
 
    

  componentDidMount() {
   
    db.collection('news_thairath')
        .where('status', '==', 1).where('person','==','Normal User')
        .orderBy("news_date", "desc")
        .get()
        .then( snapshot => {
            const news_thairath = []
            snapshot.forEach(doc => {
                // const data = doc.data()             
                news_thairath.push({ id: doc.id,
                data: doc.data()})
                console.log(doc.data()
                )
            })
            this.setState({news_thairath:news_thairath})
            
        }).catch(error => console.log(error))
  }

    
  render() {
    return (
    
      <div>
        
        <div className="App-link">
          <h3 className="heading">ตรวจสอบปัญหา</h3>
          <div className="App-line"></div>
                 
            <div className="">
              <div className="card bg-light mb-3 card-size-fake">
                <div className="card-header">ปัญหาทั้งหมด</div>
                {this.state.news_thairath &&
                  this.state.news_thairath.map((content) => {
                  
                    return (
                        <div className="card-body pt-3 pb-0">
                        {content.name == "Thairath" ? (
                        <img className="news-img" src={img} />
                        ) : (
                        <img className="news-img" src={content.data.photo} />
                        )}
                        <p className="name">{content.data.fullName}</p>
                        <p className="time-fake">เลขบัตรประชาชน:  {content.data.id}</p>
                        <p className="mt-1 mb-1">{content.data.news_name}</p>
                        <p className="card-subtitle mt-1">{content.data.province}</p>
                        <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {content.data.topic}</p>
                        <p className='time-fake'>เวลาที่แจ้งปัญหา: {content.data.news_date}</p>
                        
                        <p className='mb-0'>สถานที่ที่เกิดปัญหา:</p>
                       
                        <Map center={[
                            content.data.location[0],
                            content.data.location[1]]} zoom={16}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker 
                            key={content.id}
                            position={[
                            content.data.location[0],
                            content.data.location[1]]}
                            icon={map}
                            >
                            </Marker>        
                        </Map>
                        

                        <hr className="mb-0 mt-0"></hr>
                    </div>
                      
                    );
                  })}
              </div>
            </div>
            
        </div>
        
        
      </div>
    );
  }
}

export default TrueNews;
