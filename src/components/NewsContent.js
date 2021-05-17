import React from 'react';
import { db, auth } from '../data/firebase'
import Trending from './Trending';
import Filtering from './Filtering';
import img from '../img/thairath.png'
import '../CSS/NewsContent.css'
import 'bootstrap/dist/css/bootstrap.css';

class NewsContent extends React.Component{
    state = {
        news_thairath:null
    }

    componentDidMount(){
        db.collection('news_thairath')
        .where('person','==','News Agency')
        .get()
        .then( snapshot => {
            const news_thairath = []
            snapshot.forEach(doc => {
                const data = doc.data()
                news_thairath.push(data)
                console.log(data)
            })
            this.setState({news_thairath:news_thairath})
        }).catch(error => console.log(error))
    }

    render(){
        return(
            <div className='row mx-0 carddiv'>
                <div className='col-8'>
                      
                    <div className="card bg-card mb-3 card-size">
                    <div className="card-header">ข่าวจากสำนักข่าว(demo data)</div>
                    {this.state.news_thairath &&
                    this.state.news_thairath.map( content => {
                        return(
                                
                                <div className="card-body pt-3 pb-0">
                                {content.name == 'Thairath' &&
                                <img className='news-img' src={img}/>
                                }
                                <p className='news'>{content.name}</p>
                                <p className='mt-1'>{content.news_name}</p>
                                {content.news_name.includes("ฝุ่น") || content.news_name.includes("ฝนตก") ||
                        content.news_name.includes("ร้อน") || content.news_name.includes("หนาว") ||
                        content.news_name.includes("อากาศ")?
                                <p className='card-subtitle'>ประเภทของปัญหา: สภาพแวดล้อม</p>                               
                                :                               
                                content.news_name.includes("แทง") || content.news_name.includes("ยิง") || 
                                content.news_name.includes("โจร") || content.news_name.includes("ฆ่า") ||
                                content.news_name.includes("ปล้น") || content.news_name.includes("ชิง") ||
                                content.news_name.includes("ข่มขืน") || content.news_name.includes("โกง")?
                                  <p className='card-subtitle'>ประเภทของปัญหา:อาชญากรรม </p>
                                  :
                                    content.news_name.includes("ไฟไหม้") || content.news_name.includes("น้ำท่วม") 
                                    || content.news_name.includes("น้ำป่าไหลหลาก")?
                                    <p className='card-subtitle'>ประเภทของปัญหา: ภัยพิบัติ </p>
                                    :
                                      content.news_name.includes("โควิด") || content.news_name.includes("covid")?
                                      <p className='card-subtitle'>ประเภทของปัญหา: COVID-19 </p>
                                      :
                                        content.news_name.includes("รถติด") || content.news_name.includes("จราจร")?
                                        <p className='card-subtitle'>ประเภทของปัญหา: การจราจร </p>
                                        :
                                          content.news_name.includes("เลือกตั้ง") || content.news_name.includes("ม็อบ") ||
                                          content.news_name.includes("นายก") || content.news_name.includes("รัฐ")?
                                          <p className='card-subtitle'>ประเภทของปัญหา: การเมือง </p>
                                          :
                                          content.news_name.includes("เลือกตั้ง") || content.news_name.includes("ม็อบ") ||
                                          content.news_name.includes("นายก") || content.news_name.includes("รัฐ")?
                                          <p className='card-subtitle'>ประเภทของปัญหา: การเมือง </p>
                                            :
                                            content.news_name.includes("รถชน") || content.news_name.includes("ล้ม") ||
                                            content.news_name.includes("คว่ำ")?
                                            <p className='card-subtitle'>ประเภทของปัญหา: อุบัติเหตุ </p>
                                              :
                                              <p className='card-subtitle'>ประเภทของปัญหา: ข่าวสังคม </p>

                        }                
                                <p className='mt-1'>{content.province}</p>
                                <a className='link' href={content.news_url}>คลิกที่นี่เพื่อดูรายละเอียด</a>
                                <hr className='mb-0 mt-0 hr-news'></hr>
                                </div>                
                            
                        )
                    })}
                    </div>
                </div>
                <div className='col-4'>
                    {/* <Filtering/> */}
                    <Trending/>
                </div>
                
            </div>
        )
    }
} 
export default NewsContent;
