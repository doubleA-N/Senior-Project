import React from 'react';
import 'react-pivottable/pivottable.css';
import { db, auth} from '../data/firebase'
import firebase from 'firebase/app';
import { FireSQL } from 'firesql';
import 'firebase/firestore';
import '../CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';


const fireSQL = new FireSQL(firebase.firestore());
const crime = fireSQL.query(`SELECT * FROM news_thairath WHERE topic = 'อาชญากรรม'`);
crime.then(doc => {
    for (const data of doc){
        console.count(data)
    }
})

class Trending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null,
          props
         
        };
      }
      componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({user})
            
          }
        
        db.collection('news_thairath')
        .get()
        .then( snapshot => {
            
            const news_thairath = []
            const data = snapshot.size
            news_thairath.push(data)
            
            this.setState({news_thairath:news_thairath})
            console.log(news_thairath.length)
        }).catch(error => console.log(error))

    })
            
      }
    
    
    render() {
      return (
        
          <div >
                    <div className="card bg-light mt-3">
                    <div className="card-header">หัวข้อที่เป็นที่นิยม</div>
                    <p class="card-text ml-4 mt-2">#1 อาชญากรรม 470 ข้อมูล</p>
                    <hr className="mb-0 mt-0"></hr>
                    <p class="card-text ml-4 mt-2">#2 จราจร 245 ข้อมูล</p>
                    <hr className="mb-0 mt-0"></hr>
                    <p class="card-text ml-4 mt-2">#3 สภาพแวดล้อม 201 ข้อมูล</p>
                    <hr className="mb-0 mt-0"></hr>
                    <p class="card-text ml-4 mt-2">#4 COVID-19 170 ข้อมูล</p>
                    <hr className="mb-0 mt-0"></hr>
                    <p class="card-text ml-4 mt-2">#5 อุบัติเหตุ 100 ข้อมูล</p>
                    <hr className="mb-0 mt-0"></hr>
                  </div>
          </div>       
        
          );
        }
     }
export default Trending;
