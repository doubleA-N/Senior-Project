import React from "react";
import Tranding from './Trending'
// import Filtering from './Filtering'
import "../CSS/Content.css";
import { db, auth } from "../data/firebase";
import img from "../img/thairath.png";
// import request from "request";
import verify from '../img/verify.png'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        news_thairath:null,
        selected: false,
        DisasNews:null,  
        CovidNews:null,
        EnvNews:null,
        SocialNews:null,
        CrimeNews:null,
        TriffNews:null,
        AcciNews:null,
        PolitNews:null,
        checking:null,
        keyword:null

    };
    this.filtering = this.filtering.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.keyword = this.keyword.bind(this)
  }

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
        .where('status','==',1)
        .orderBy("news_date", "desc")
            .get()
            .then( snapshot => {
                const news_thairath = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    news_thairath.push(data)
                    // console.log(data)
                })
                this.setState({news_thairath:news_thairath})
            }).catch(error => console.log(error))
  }

  filtering = (e) =>{
    console.log('topic',e)
    this.setState({selected:true})
    let query = db.collection('news_thairath').where('status','==',1).orderBy("news_date", "desc")
    let Disas = query.where('topic', '==', 'ภัยพิบัติ')
    let CO = query.where('topic', '==', 'COVID-19')
    let Env = query.where('topic', '==', 'สภาพแวดล้อม')
    let Social = query.where('topic', '==', 'ข่าวสังคม')
    let cri = query.where('topic', '==', 'อาชญากรรม')
    let traf = query.where('topic', '==', 'จราจร')
    let acc = query.where('topic', '==', 'อุบัติเหตุ')
    let poli = query.where('topic', '==', 'การเมือง')
    
    if(e == 'ภัยพิบัติ'){
      Disas.get()
      .then( snapshot => {
      // let size = snapshot.size
        snapshot.forEach(doc => {
          // const data = doc.data()
          this.setState({DisasNews:doc.data()})
          console.log(this.state.DisasNews)
        })
      }).catch(error => console.log(error))
    }
    else if(e == 'COVID-19'){
      CO.get()
      .then( snapshot => {
        snapshot.forEach(doc => {
          this.setState({CovidNews:doc.data()})
        })
      }).catch(error => console.log(error))
    }
    else if(e == 'ข่าวสังคม'){
      Social.get()
      .then( snapshot => {
        snapshot.forEach(doc => {
          this.setState({SocialNews:doc.data()})
        })
      }).catch(error => console.log(error))
    }
    else if(e == 'สภาพแวดล้อม'){
      Env.get()
      .then( snapshot => {
        snapshot.forEach(doc => {
          this.setState({EnvNews:doc.data()})
        })
      }).catch(error => console.log(error))
    }
    else if(e == 'อาชญากรรม'){
      cri.get()
      .then( snapshot => {
        snapshot.forEach(doc => {
          this.setState({CrimeNews:doc.data()})
        })
      }).catch(error => console.log(error))
    }
    else if(e == 'จราจร'){
      traf.get()
      .then( snapshot => {
        snapshot.forEach(doc => {
          this.setState({TriffNews:doc.data()})
        })
      }).catch(error => console.log(error))
    }
    else if(e == 'อุบัติเหตุ'){
      acc.get()
      .then( snapshot => {
        snapshot.forEach(doc => {
          this.setState({AcciNews:doc.data()})
        })
      }).catch(error => console.log(error))
    }
    else if(e == 'การเมือง'){
      poli.get()
      .then( snapshot => {
        snapshot.forEach(doc => {
          this.setState({PolitNews:doc.data()})
        })
      }).catch(error => console.log(error))
    }

  }
  handleChange = (e) =>{
    
    const value = e.target.value
    // console.log('test',value)
    let query = db.collection('news_thairath').where('status','==',1).orderBy("news_date", "desc")
    let personshow = query.where('person', '==', 'Normal User')
    let agencyshow = query.where('person','==','News Agency')
    if( value == 'person'){
      personshow.get()
      .then( snapshot => {
        const news_thairath = []
        snapshot.forEach(doc => {
          // const data = doc.data()
          const data = doc.data()
          news_thairath.push(data)
          
          // console.log(this.state.DisasNews)
        })
        this.setState({news_thairath:news_thairath})
      }).catch(error => console.log(error))
    } else if(value == 'agency'){
      agencyshow.get()
      .then( snapshot => {
        const news_thairath = []
        snapshot.forEach(doc => {
          const data = doc.data()
          news_thairath.push(data)
          
          // console.log(this.state.DisasNews)
        })
        this.setState({news_thairath:news_thairath})
      }).catch(error => console.log(error))
    }else if(value == 'all'){
      query.get()
      .then( snapshot => {
        const news_thairath = []
        snapshot.forEach(doc => {
          const data = doc.data()
          news_thairath.push(data)
          
          // console.log(this.state.DisasNews)
        })
        this.setState({news_thairath:news_thairath})
      }).catch(error => console.log(error))
    }
    
  }
  keyword = (e) => {
    
    const value = e.target.value
   
    db.collection('news_thairath')
        .where('status','==',1)
        .orderBy("news_date", "desc")
        // .startAt(value)
        .get()
        .then( snapshot => {
          const news_thairath = []
          
          snapshot.forEach(doc => {
          const data = doc.data().news_name
            if(data.includes(value)){
              news_thairath.push(doc.data())
              this.setState({news_thairath:news_thairath})
              console.log(this.state.news_thairath)
            }
          
          // const search = doc.data().news_name()
          // news_thairath.push(data)
          
          })
          // this.setState({news_thairath:news_thairath})
        }).catch(error => console.log(error))
    // this.state.news_thairath.map((word) =>{
    // const found = word.news_name.match(value)
    // console.log(word)  
    
    //   if(found != null){
    //     this.setState({keyword:found})
    //     console.log('found',found)
    //   }
      
    // })
    
    // let query = db.collection('news_thairath').where('status','==',1).orderBy("news_date", "desc")
    // let search = query.where('news_name','==',value)
    
  }

  render() {
    return (
      <div>
        <div className="App-link">
          <h3 className="heading">ดูข้อมูลของปัญหา</h3>
          <div className="App-line"></div>
          {/* <div class="alert alert-danger mt-3" role="alert">
            <h4 class="alert-heading">
              โปรดระมัดระวัง และใช้วิจารญาณในการอ่าน
            </h4>
            <hr></hr>
            <p class="mb-0">
              บางปัญหาจากผู้ใช้บางท่านอาจมีถ้อยคำที่รุนแรง
              และยังไม่ได้รับการยืนยืนข้อมูลว่าเป็นความจริงหรือไม่
            </p>
          </div> */}

          <div className="row mx-0">
            <div className="col-8">
              <div className="card bg-light mb-3 card-size">
                <div className="card-header">ปัญหาทั้งหมด</div>
                {this.state.selected === false ?
                  this.state.news_thairath &&
                  this.state.news_thairath.map((content) => {
                  
                    return (
                      <div className="card-body pt-3 pb-0">
                        {content.name == "Thairath" ? (
                          <>
                          <p>demo</p>
                          <img className="news-img" src={img} /> 
                          </>
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
                        <p className='time-content'>{content.news_date}</p>
                        {content.verify &&
                          <p className='time-content'> Verified by: {content.verify}<img src={verify} /></p>
                        }
                        <hr className="mb-0 mt-0"></hr>
                      </div>
                    );
                  })
                :
                this.state.DisasNews ?
                  <div className="card-body pt-3 pb-0">
                    {this.state.DisasNews.name == "Thairath" ? (
                      <img className="news-img" src={img} />
                    ) : (
                      <img className="news-img" src={this.state.DisasNews.photo} />
                    )}
                    <p className="name">{this.state.DisasNews.name}</p>
                    <p className="mt-1 mb-1">{this.state.DisasNews.news_name}</p>
                    <p className="card-subtitle mt-1">{this.state.DisasNews.province}</p>
                    <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {this.state.DisasNews.topic}</p>
                     
                    {this.state.DisasNews.news_url && (
                      <h6>
                        
                        <a href={this.state.DisasNews.news_url}>
                          คลิกที่นี่เพื่อดูรายละเอียด
                        </a>
                      </h6>
                    )}
                    <p className='time-content'>{this.state.DisasNews.news_date}</p>
                    {this.state.DisasNews.verify &&
                      <p className='time-content'> Verified by: {this.state.DisasNews.verify}<img src={verify} /></p>
                    }
                    <hr className="mb-0 mt-0"></hr>
                  </div>
                
                :
                  this.state.CovidNews ?
                  <div className="card-body pt-3 pb-0">
                      {this.state.CovidNews.name == "Thairath" ? (
                        <img className="news-img" src={img} />
                      ) : (
                        <img className="news-img" src={this.state.CovidNews.photo} />
                      )}
                      <p className="name">{this.state.CovidNews.name}</p>
                      <p className="mt-1 mb-1">{this.state.CovidNews.news_name}</p>
                      <p className="card-subtitle mt-1">{this.state.CovidNews.province}</p>
                      <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {this.state.CovidNews.topic}</p>
                      
                      {this.state.CovidNews.news_url && (
                        <h6>
                          
                          <a href={this.state.CovidNews.news_url}>
                            คลิกที่นี่เพื่อดูรายละเอียด
                          </a>
                        </h6>
                      )}
                      <p className='time-content'>{this.state.CovidNews.news_date}</p>
                      {this.state.CovidNews.verify &&
                        <p className='time-content'> Verified by: {this.state.CovidNews.verify}<img src={verify} /></p>
                      }
                      <hr className="mb-0 mt-0"></hr>
                    </div>
                    :
                      this.state.SocialNews ?
                          <div className="card-body pt-3 pb-0">
                          {this.state.SocialNews.name == "Thairath" ? (
                            <img className="news-img" src={img} />
                          ) : (
                            <img className="news-img" src={this.state.SocialNews.photo} />
                          )}
                          <p className="name">{this.state.SocialNews.name}</p>
                          <p className="mt-1 mb-1">{this.state.SocialNews.news_name}</p>
                          <p className="card-subtitle mt-1">{this.state.SocialNews.province}</p>
                          <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {this.state.SocialNews.topic}</p>
                          
                          {this.state.SocialNews.news_url && (
                            <h6>
                              
                              <a href={this.state.SocialNews.news_url}>
                                คลิกที่นี่เพื่อดูรายละเอียด
                              </a>
                            </h6>
                          )}
                          <p className='time-content'>{this.state.SocialNews.news_date}</p>
                          {this.state.SocialNews.verify &&
                            <p className='time-content'> Verified by: {this.state.SocialNews.verify}<img src={verify} /></p>
                          }
                          <hr className="mb-0 mt-0"></hr>
                          </div>
                      :
                        this.state.CrimeNews ?
                          <div className="card-body pt-3 pb-0">
                          {this.state.CrimeNews.name == "Thairath" ? (
                            <img className="news-img" src={img} />
                          ) : (
                            <img className="news-img" src={this.state.CrimeNews.photo} />
                          )}
                          <p className="name">{this.state.CrimeNews.name}</p>
                          <p className="mt-1 mb-1">{this.state.CrimeNews.news_name}</p>
                          <p className="card-subtitle mt-1">{this.state.CrimeNews.province}</p>
                          <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {this.state.CrimeNews.topic}</p>
                          
                          {this.state.CrimeNews.news_url && (
                            <h6>
                              
                              <a href={this.state.CrimeNews.news_url}>
                                คลิกที่นี่เพื่อดูรายละเอียด
                              </a>
                            </h6>
                          )}
                          <p className='time-content'>{this.state.CrimeNews.news_date}</p>
                          {this.state.CrimeNews.verify &&
                            <p className='time-content'> Verified by: {this.state.CrimeNews.verify}<img src={verify} /></p>
                          }
                          <hr className="mb-0 mt-0"></hr>
                          </div>
                        :
                          this.state.TriffNews ?
                            <div className="card-body pt-3 pb-0">
                            {this.state.TriffNews.name == "Thairath" ? (
                              <img className="news-img" src={img} />
                            ) : (
                              <img className="news-img" src={this.state.TriffNews.photo} />
                            )}
                            <p className="name">{this.state.TriffNews.name}</p>
                            <p className="mt-1 mb-1">{this.state.TriffNews.news_name}</p>
                            <p className="card-subtitle mt-1">{this.state.TriffNews.province}</p>
                            <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {this.state.TriffNews.topic}</p>
                            
                            {this.state.TriffNews.news_url && (
                              <h6>
                                
                                <a href={this.state.TriffNews.news_url}>
                                  คลิกที่นี่เพื่อดูรายละเอียด
                                </a>
                              </h6>
                            )}
                            <p className='time-content'>{this.state.TriffNews.news_date}</p>
                            {this.state.TriffNews.verify &&
                              <p className='time-content'> Verified by: {this.state.TriffNews.verify}<img src={verify} /></p>
                            }
                            <hr className="mb-0 mt-0"></hr>
                            </div>
                          :
                            this.state.AcciNews ?
                              <div className="card-body pt-3 pb-0">
                              {this.state.AcciNews.name == "Thairath" ? (
                                <img className="news-img" src={img} />
                              ) : (
                                <img className="news-img" src={this.state.AcciNews.photo} />
                              )}
                              <p className="name">{this.state.AcciNews.name}</p>
                              <p className="mt-1 mb-1">{this.state.AcciNews.news_name}</p>
                              <p className="card-subtitle mt-1">{this.state.AcciNews.province}</p>
                              <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {this.state.AcciNews.topic}</p>
                              
                              {this.state.AcciNews.news_url && (
                                <h6>
                                  
                                  <a href={this.state.AcciNews.news_url}>
                                    คลิกที่นี่เพื่อดูรายละเอียด
                                  </a>
                                </h6>
                              )}
                              <p className='time-content'>{this.state.AcciNews.news_date}</p>
                              {this.state.AcciNews.verify &&
                                <p className='time-content'> Verified by: {this.state.AcciNews.verify}<img src={verify} /></p>
                              }
                              <hr className="mb-0 mt-0"></hr>
                              </div>
                            :
                              this.state.EnvNews ?
                                <div className="card-body pt-3 pb-0">
                                {this.state.EnvNews.name == "Thairath" ? (
                                  <img className="news-img" src={img} />
                                ) : (
                                  <img className="news-img" src={this.state.EnvNews.photo} />
                                )}
                                <p className="name">{this.state.EnvNews.name}</p>
                                <p className="mt-1 mb-1">{this.state.EnvNews.news_name}</p>
                                <p className="card-subtitle mt-1">{this.state.EnvNews.province}</p>
                                <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {this.state.EnvNews.topic}</p>
                                
                                {this.state.EnvNews.news_url && (
                                  <h6>
                                    
                                    <a href={this.state.EnvNews.news_url}>
                                      คลิกที่นี่เพื่อดูรายละเอียด
                                    </a>
                                  </h6>
                                )}
                                <p className='time-content'>{this.state.EnvNews.news_date}</p>
                                {this.state.EnvNews.verify &&
                                  <p className='time-content'> Verified by: {this.state.EnvNews.verify}<img src={verify} /></p>
                                }
                                <hr className="mb-0 mt-0"></hr>
                                </div>
                              :
                                this.state.PolitNews &&
                                    <div className="card-body pt-3 pb-0">
                                    {this.state.PolitNews.name == "Thairath" ? (
                                      <img className="news-img" src={img} />
                                    ) : (
                                      <img className="news-img" src={this.state.PolitNews.photo} />
                                    )}
                                    <p className="name">{this.state.PolitNews.name}</p>
                                    <p className="mt-1 mb-1">{this.state.PolitNews.news_name}</p>
                                    <p className="card-subtitle mt-1">{this.state.PolitNews.province}</p>
                                    <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {this.state.PolitNews.topic}</p>
                                    
                                    {this.state.PolitNews.news_url && (
                                      <h6>
                                        
                                        <a href={this.state.PolitNews.news_url}>
                                          คลิกที่นี่เพื่อดูรายละเอียด
                                        </a>
                                      </h6>
                                    )}
                                    <p className='time-content'>{this.state.PolitNews.news_date}</p>
                                    {this.state.PolitNews.verify &&
                                      <p className='time-content'> Verified by: {this.state.PolitNews.verify}<img src={verify} /></p>
                                    }
                                    <hr className="mb-0 mt-0"></hr>
                                    </div>

                }
                
              </div>
            </div>

            <div className="col-4">
              <Tranding />
              <div className="card bg-light mt-3">
                    <div className="card-header">คัดเลือกข้อมูลของปัญหา</div>
                    <p className='mt-2 ml-2 mb-0'>เลือกหัวข้อหรือคำของปัญหา</p>
                    <InputGroup>
                      <Form.Control
                        placeholder="ค้นหาด้วยคำ"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={this.keyword}
                        value={this.state.checking}                       
                      />

                      <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title="หัวข้อทั้งหมด"
                        id="input-group-dropdown-2"

                      >
                        <Dropdown.Item 
                        onSelect={this.filtering}
                        eventKey='ภัยพิบัติ'
                        >
                          ภัยพิบัติ
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Dropdown.Item 
                        onSelect={this.filtering}
                        eventKey='COVID-19'
                        >
                          COVID-19
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Dropdown.Item 
                        onSelect={this.filtering}
                        eventKey='ข่าวสังคม'
                        >
                          ข่าวสังคม
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Dropdown.Item 
                        onSelect={this.filtering}
                        eventKey='อาชญากรรม'
                        >
                          อาชญากรรม
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Dropdown.Item 
                        onSelect={this.filtering}
                        eventKey='จราจร'
                        >
                          จราจร
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Dropdown.Item 
                        onSelect={this.filtering}
                        eventKey='อุบัติเหตุ'
                        >
                          อุบัติเหตุ
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Dropdown.Item 
                        onSelect={this.filtering}
                        eventKey='สภาพแวดล้อม'
                        >
                          สภาพแวดล้อม
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Dropdown.Item 
                        onSelect={this.filtering}
                        eventKey='การเมือง'
                        >
                          การเมือง
                        </Dropdown.Item>
                        

                      </DropdownButton>
                    </InputGroup>
                    <fieldset>
                      <p className='mt-2 ml-2 mb-0'>เลือกแหล่งที่มาของปัญหา</p>
                      <Form.Group className='ml-2'>
                          <Form.Check
                            type="radio"
                            label="ทั้งหมด"
                            name="check"
                            id="formHorizontalRadios1"
                            value='all'
                            onClick={this.handleChange}
                            defaultChecked
                          />
                          <Form.Check
                            type="radio"
                            label="จากสำนักข่าว"
                            name="check"
                            id="formHorizontalRadios2"
                            value='agency'
                            onClick={this.handleChange}
                            
                          />
                          <Form.Check
                            type="radio"
                            label="จากผู้ใช้งาน"
                            name="check"
                            id="formHorizontalRadios3"
                            value='person'
                            onClick={this.handleChange}
                            
                          />
                        
                      </Form.Group>
                    </fieldset>
                    </div> 
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
