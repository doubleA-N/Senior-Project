import React from 'react';
import 'react-pivottable/pivottable.css';
import { db, auth} from '../data/firebase'
import 'firebase/firestore';
import '../CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';



class Trending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null,
          disaster: 0,
          covid: 0,
          environment: 0,
          social: 0,
          traffic: 0,
          accident: 0,
          crime: 0,
          politic: 0,
          sorted: null,
          props
         
        };
        this.sorting = this.sorting.bind(this)
      }
      componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({user})
            
          }
        
        let query = db.collection('news_thairath').where('status','==',1)
        let Disas = query.where('topic', '==', 'ภัยพิบัติ')
        let CO = query.where('topic', '==', 'COVID-19')
        let Env = query.where('topic', '==', 'สภาพแวดล้อม')
        let Social = query.where('topic', '==', 'ข่าวสังคม')
        let cri = query.where('topic', '==', 'อาชญากรรม')
        let traf = query.where('topic', '==', 'จราจร')
        let acc = query.where('topic', '==', 'อุบัติเหตุ')
        let poli = query.where('topic', '==', 'การเมือง')
        
        if(Disas){
            Disas.get()
            .then( snapshot => {
            let size = snapshot.size
              this.setState({disaster:size})
            // console.log('count',size)
            }).catch(error => console.log(error))
        }
        if(CO){
            CO.get()
            .then( snapshot => {
            let size = snapshot.size
              this.setState({covid:size})
            // console.log('covid',size)
            }).catch(error => console.log(error))
        }
        if(Env){
            Env.get()
            .then( snapshot => {
            let size = snapshot.size
              this.setState({environment:size})
            // console.log('covid',size)
            }).catch(error => console.log(error))
        }
        if(Social){
            Social.get()
            .then( snapshot => {
            let size = snapshot.size
              this.setState({social:size})
            // console.log('covid',size)
            }).catch(error => console.log(error))
        }
        if(cri){
          cri.get()
          .then( snapshot => {
          let size = snapshot.size
            this.setState({crime:size})
          // console.log('covid',size)
          }).catch(error => console.log(error))
        }
        if(traf){
          traf.get()
          .then( snapshot => {
          let size = snapshot.size
            this.setState({traffic:size})
          // console.log('covid',size)
          }).catch(error => console.log(error))
        }
        if(acc){
          acc.get()
          .then( snapshot => {
          let size = snapshot.size
            this.setState({accident:size})
          // console.log('covid',size)
          }).catch(error => console.log(error))
        }
        if(poli){
          poli.get()
          .then( snapshot => {
          let size = snapshot.size
            this.setState({politic:size})
            this.sorting()
          }).catch(error => console.log(error))
        }
      })
        
      }

    sorting = () => {
     var fields = 
      [{topic:'COVID-19',value:this.state.covid},
      {topic:'ภัยพิบัติ',value:this.state.disaster},
      {topic:'ข่าวสังคม',value:this.state.social},
      {topic:'อาชญากรรม',value:this.state.crime},
      {topic:'จราจร',value:this.state.traffic},
      {topic:'การเมือง',value:this.state.politic},
      {topic:'อุบัติเหตุ',value:this.state.accident},
      {topic:'สภาพแวดล้อม',value:this.state.environment}
      ];
 
      fields = fields.sort((a,b) => b.value - a.value)
      this.setState({sorted:fields})
      
    }
    
    
    render() {
      return (
        
          <div >
                    
                    <div className="card bg-light mt-3">
                    <div className="card-header">หัวข้อที่เป็นที่นิยม</div>
                    
                    {this.state.sorted && 
                      this.state.sorted.map((sorting,i) => {
                        // console.log('old',this.state.sorted)
                        return(
                          <div>
                            <p class="card-text ml-4 mt-2">#{i+1} {sorting.topic} {sorting.value} ข้อมูล</p>
                            <hr className="mb-0 mt-0"></hr>
                          </div>
                        )
                      })}
                    {/* <button onClick={this.sorting}>Sort</button> */}
                  </div>
          </div>       
        
          );
        }
     }
export default Trending;
