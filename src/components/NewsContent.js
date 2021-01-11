import React from 'react';
import { db, auth } from '../data/firebase'
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
            })
            this.setState({news_thairath:news_thairath})
        }).catch(error => console.log(error))
    }

    render(){
        return(
            <div className='row mx-0 carddiv'>
                <div className='col-8'>
                      
                    <div className="card bg-card mb-3 card-size">
                    <div className="card-header">ข่าวจากสำนักข่าว</div>
                    {this.state.news_thairath &&
                    this.state.news_thairath.map( content =>{
                        return(
                                
                                <div className="card-body pt-3 pb-0">
                                {content.name == 'Thairath' &&
                                <img className='news-img' src={img}/>
                                }
                                <p className='news'>{content.name}</p>
                                <p className='mt-1'>{content.news_name}</p>
                                <p className='card-subtitle'>ประเภทของปัญหา: {content.topic}</p>
                                <p className='mt-1'>{content.province}</p>
                                <a className='link' href={content.news_url}>คลิกที่นี่เพื่อดูรายละเอียด</a>
                                <hr className='mb-0 mt-0 hr-news'></hr>
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
        )
    }
} 
export default NewsContent;
