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
      const size = []
        snapshot.forEach(doc => {
          const data = doc.data()
          size.push(data)
          console.log(this.state.DisasNews)
        }) 
        this.setState({DisasNews:size,
        })
      }).catch(error => console.log(error))
    }
    else if(e == 'COVID-19'){
      CO.get()
      .then( snapshot => {
        const size = []
        snapshot.forEach(doc => {
          const data = doc.data()
          size.push(data)
        })
      this.setState({CovidNews:size})
      }).catch(error => console.log(error))
    }
    else if(e == 'ข่าวสังคม'){
      Social.get()
      .then( snapshot => {
        const size = []
        snapshot.forEach(doc => {
          const data = doc.data()
          size.push(data)  
        })
        this.setState({SocialNews:size})
      }).catch(error => console.log(error))
    }
    else if(e == 'สภาพแวดล้อม'){
      Env.get()
      .then( snapshot => {
        const size = []
        snapshot.forEach(doc => {
          const data = doc.data()
          size.push(data)
        })
        this.setState({EnvNews:size})
      }).catch(error => console.log(error))
    }
    else if(e == 'อาชญากรรม'){
      cri.get()
      .then( snapshot => {
        const size =[]
        snapshot.forEach(doc => {
          const data = doc.data()
          size.push(data)
        })
        this.setState({CrimeNews:size})
      }).catch(error => console.log(error))
    }
    else if(e == 'จราจร'){
      traf.get()
      .then( snapshot => {
      const size =[]
        snapshot.forEach(doc => {
          const data = doc.data()
          size.push(data)
        })
        this.setState({TriffNews:size})
      }).catch(error => console.log(error))
    }
    else if(e == 'อุบัติเหตุ'){
      acc.get()
      .then( snapshot => {
        const size = []
        snapshot.forEach(doc => {
          const data = doc.data()
          size.push(data)
          // console.log(this.state.AcciNews)
        })
        this.setState({AcciNews:size})
      }).catch(error => console.log(error))
    }
    else if(e == 'การเมือง'){
      poli.get()
      .then( snapshot => {
        const size = []
        snapshot.forEach(doc => {
          const data = doc.data()
          size.push(data)
        })
        this.setState({PolitNews:size})
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
                  this.state.DisasNews.map((content) =>{
                    return(
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
                        <p className='time-content'>{content.news_date}</p>
                        {content.verify &&
                          <p className='time-content'> Verified by: {content.verify}<img src={verify} /></p>
                        }
                        <hr className="mb-0 mt-0"></hr>
                    </div>
                    )
                    
                  })
                
                :
                  this.state.CovidNews ?
                  this.state.CovidNews.map((content) =>{
                    return(
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
                        <p className='time-content'>{content.news_date}</p>
                        {content.verify &&
                          <p className='time-content'> Verified by: {content.verify}<img src={verify} /></p>
                        }
                        <hr className="mb-0 mt-0"></hr>
                    </div>
                    )
                  })
                    :
                      this.state.SocialNews ?
                      this.state.SocialNews.map((content) =>{
                        return(
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
                            <p className='time-content'>{content.news_date}</p>
                            {content.verify &&
                              <p className='time-content'> Verified by: {content.verify}<img src={verify} /></p>
                            }
                            <hr className="mb-0 mt-0"></hr>
                        </div>
                        )
                      })
                      :
                        this.state.CrimeNews ?
                        this.state.CrimeNews.map((content) =>{
                          return(
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
                              <p className='time-content'>{content.news_date}</p>
                              {content.verify &&
                                <p className='time-content'> Verified by: {content.verify}<img src={verify} /></p>
                              }
                              <hr className="mb-0 mt-0"></hr>
                          </div>
                          )
                        })
                        :
                          this.state.TriffNews ?
                          this.state.TriffNews.map((content) =>{
                            return(
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
                                <p className='time-content'>{content.news_date}</p>
                                {content.verify &&
                                  <p className='time-content'> Verified by: {content.verify}<img src={verify} /></p>
                                }
                                <hr className="mb-0 mt-0"></hr>
                            </div>
                            )
                          })
                          :
                            this.state.AcciNews ?
                            this.state.AcciNews.map((a) =>{
                              return(
                              <div className="card-body pt-3 pb-0">
                              {a.name == "Thairath" ? (
                                <img className="news-img" src={img} />
                              ) : (
                                <img className="news-img" src={a.photo} />
                              )}
                              <p className="name">{a.name}</p>
                              <p className="mt-1 mb-1">{a.news_name}</p>
                              <p className="card-subtitle mt-1">{a.province}</p>
                              <p className='card-subtitle'>ประเภทของปัญหาหลังจากการทำนายด้วย AI: {a.topic}</p>
                              <p className='time-content'>{a.news_date}</p>
                              {a.verify &&
                                <p className='time-content'> Verified by: {a.verify}<img src={verify} /></p>
                              }
                              <hr className="mb-0 mt-0"></hr>
                              </div>
                              )
                            })
                              
                            :
                              this.state.EnvNews ?
                              this.state.EnvNews.map((content) =>{
                                return(
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
                                    <p className='time-content'>{content.news_date}</p>
                                    {content.verify &&
                                      <p className='time-content'> Verified by: {content.verify}<img src={verify} /></p>
                                    }
                                    <hr className="mb-0 mt-0"></hr>
                                </div>
                                )
                              })
                              :
                                this.state.PolitNews &&
                                this.state.PolitNews.map((content) =>{
                                  return(
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
                                      <p className='time-content'>{content.news_date}</p>
                                      {content.verify &&
                                        <p className='time-content'> Verified by: {content.verify}<img src={verify} /></p>
                                      }
                                      <hr className="mb-0 mt-0"></hr>
                                  </div>
                                  )
                                })

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
