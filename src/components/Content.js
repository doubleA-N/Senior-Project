import React from 'react';
import '../CSS/Content.css'
import { db, auth } from '../data/firebase'
import img from '../img/thairath.png'



class Content extends React.Component {
    
    state = {
        news_thairath:null
    }
    
    componentDidMount(){

        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({user})
            }
        })

       

     const newsData = (await db.collection('news_thairath').get()).docs.map(e => e.data())
const bullyData = newsData.map((doc) => request())

    //  .doc()
    //  .get()
    //  .
    //  console.log('data', data)
        // .then( snapshot => {
        //     const news_thairath = []
        //     snapshot.forEach(doc => {
        //         const data = doc.data()
        //         news_thairath.push(data)
        //     })
            
            this.setState({news_thairath:news_thairath})
        }).catch(error => console.log(error))
        
        
    }
    
 render(){
     return(
        <div>
          
          <div className='App-link'>
          <h3 className='heading'>ดูข้อมูลของปัญหา</h3>
          <div  className='App-line'></div>           
          <div class="alert alert-danger mt-3" role="alert">
                  <h4 class="alert-heading">โปรดระมัดระวัง และใช้วิจารญาณในการอ่าน</h4>
                  <hr></hr>
                  <p class="mb-0">บางปัญหาจากผู้ใช้บางท่านอาจมีถ้อยคำที่รุนแรง และยังไม่ได้รับการยืนยืนข้อมูลว่าเป็นความจริงหรือไม่</p>
         </div>
            
                <div className='row mx-0'>
                <div className='col-8'>
                      
                      <div className="card bg-light mb-3 card-size">
                      <div className="card-header">ปัญหาทั้งหมด</div>
                      {this.state.news_thairath &&
                      this.state.news_thairath.map( content =>{
                        
                        var request = require('request');
                        var headers = {
                            'Apikey': '370qxEEW5R7gUXPPw0Fo5BtMVU4iIkGo'
                        };
                        var dataString = 'text='+content.news_name     
                        var options = {
                            url: 'https://api.aiforthai.in.th/bully',
                            method: 'POST',
                            headers: headers,
                            body: dataString
                        };
                      var bully ='';
                        function callback(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                bully = JSON.parse(body);
                                                             
                               console.log(bully.bully_type)
                            }
                            
                        }
                        request(options, callback)
                          return(                                 
                                  <div className="card-body pt-3 pb-0">
                                  {content.name == 'Thairath' ?
                                  <img className='news-img' src={img}/>
                                  :
                                  <img className='news-img' src={content.photo}/>
                                  }       
                                  <p className='name'>{content.name}</p>
                                  <p className='mt-1 mb-1'>{content.news_name}</p>
                                  <p className='card-subtitle mt-1'>{content.province}</p>
                                  <p class="card-subtitle text-muted">ประเภทของปัญหา: {content.topic}</p>
                                  {content.news_url &&
                                  <h6> <a href={content.news_url}>คลิกที่นี่เพื่อดูรายละเอียด</a></h6>
                                  }
                                  <hr className='mb-0 mt-0'></hr>
                                  </div>                
                              
                          )
                      })}
                      </div>
                  </div>    
                  <div className='col-4'>
                    <div className="card bg-light mt-3">
                    <div className="card-header">คัดเลือกข้อมูลของปัญหา</div>
                        <p class='card-text ml-4 mt-2'></p>
                        <p class='card-text ml-4 mt-2'></p>
                        <p class='card-text ml-4 mt-2'></p>
                        <p class='card-text ml-4 mt-2'></p>
                        <p class='card-text ml-4 mt-2'></p>
                        
                    </div> 

                    <div className="card bg-light mt-3">
                    <div className="card-header">หัวข้อที่เป็นที่นิยม</div>
                        <p class='card-text ml-4 mt-2'>#1</p>
                        <hr className='mb-0 mt-0'></hr>
                        <p class='card-text ml-4 mt-2'>#2</p>
                        <hr className='mb-0 mt-0'></hr>
                        <p class='card-text ml-4 mt-2'>#3</p>
                        <hr className='mb-0 mt-0'></hr>
                        <p class='card-text ml-4 mt-2'>#4</p>
                        <hr className='mb-0 mt-0'></hr>
                        <p class='card-text ml-4 mt-2'>#5</p>
                        <hr className='mb-0 mt-0'></hr>
                        
                    </div> 
                </div>

                </div>
            </div>
        </div>
     )
 }   
      
   
    
}
    
export default Content;






