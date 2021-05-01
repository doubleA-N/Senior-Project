import React from "react";
import Tranding from './Trending'
import Filtering from './Filtering'
import "../CSS/Content.css";
import { db, auth } from "../data/firebase";
import img from "../img/thairath.png";
import request from "request";

class Content extends React.Component {
  state = {
    news_thairath: null,
  };

  async componentDidMount() {
    // var headers = {
    //   Apikey: "370qxEEW5R7gUXPPw0Fo5BtMVU4iIkGo",
    // };
    // var options = {
    //   url: "https://api.aiforthai.in.th/bully",
    //   method: "POST",
    //   headers: headers,
    // };

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    // const requestUtil = (news_name) =>
    //   new Promise((resolve, reject) => {
    //     const body = "text=" + news_name;
    //     const _options = { ...options, body };
    //     request(_options, (err, res, body) => {
    //       if (err) return reject(err);
    //       resolve(JSON.parse(body));
    //     });
    //   });

    // const newsData = (
    //   await db.collection("news_thairath").get()
    // ).docs.map((e) => e.data());
    // const bullyData = newsData.map((doc) => requestUtil(doc.news_name));
    // const mappedBullyData = await Promise.all(bullyData);
    // const merge = newsData
    //   .map((e, i) => ({ ...e, ...mappedBullyData[i] }))
    //   .map((e) => ({ ...e, key: e.id }));
    // console.log(merge);
    // this.setState({ news_thairath: merge });
    db.collection('news_thairath')
    
    .orderBy("news_date", "desc")
        .get()
        .then( snapshot => {
            const news_thairath = []
            snapshot.forEach(doc => {
                const data = doc.data()
                news_thairath.push(data)
            })
            this.setState({news_thairath:news_thairath})
        }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <div className="App-link">
          <h3 className="heading">ดูข้อมูลของปัญหา</h3>
          <div className="App-line"></div>
          <div class="alert alert-danger mt-3" role="alert">
            <h4 class="alert-heading">
              โปรดระมัดระวัง และใช้วิจารญาณในการอ่าน
            </h4>
            <hr></hr>
            <p class="mb-0">
              บางปัญหาจากผู้ใช้บางท่านอาจมีถ้อยคำที่รุนแรง
              และยังไม่ได้รับการยืนยืนข้อมูลว่าเป็นความจริงหรือไม่
            </p>
          </div>

          <div className="row mx-0">
            <div className="col-8">
              <div className="card bg-light mb-3 card-size">
                <div className="card-header">ปัญหาทั้งหมด</div>
                {this.state.news_thairath &&
                  this.state.news_thairath.map((content) => {
                  
                    return (
                      <div className="card-body pt-3 pb-0">
                        {content.name == "Thairath" ? (
                          <img className="news-img" src={img} />
                        ) : (
                          <img className="news-img" src={content.photo} />
                        )}
                        <p className="name">{content.name}</p>
                        <p className="mt-1 mb-1">{content.news_name}</p>
                        <p className="card-subtitle mt-1">{content.province}</p>
                        <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {content.topic}</p>
                         
                        {content.news_url && (
                          <h6>
                            
                            <a href={content.news_url}>
                              คลิกที่นี่เพื่อดูรายละเอียด
                            </a>
                          </h6>
                        )}
                        <p className='time'>{content.news_date}</p>
                        <hr className="mb-0 mt-0"></hr>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-4">
              <Filtering />
              <Tranding />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
