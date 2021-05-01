import React from 'react';
// import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { db, auth} from '../data/firebase'
import '../CSS/App.css';
import '../CSS/Visualize.css';
import 'bootstrap/dist/css/bootstrap.css';
// import developing from '../img/software-developer.png'
import { Bar, Line, Doughnut } from 'react-chartjs-2';
// import Filtering from './Filtering'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';

const data = {
  labels: ['จากสำนักข่าว', 'จากผู้ใช้งาน'],
  datasets: [
    {
      label: 'อาชญากรรม',
      backgroundColor: ['#E4432F','#6800B4'],
      // borderWidth: 2,
      data: [300, 170,0]
    }
  ]
}
const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}
const state2 = {
  labels: ['จากสำนักข่าว', 'จากผู้ใช้งาน'],
  datasets: [
    {
      label: 'การจราจร',
      fill: false,
      lineTension: 0.5,
      backgroundColor: '#E4432F',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

class Visualize extends React.Component {
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
        
        // db.collection('news_thairath')
        // .get()
        // .then( snapshot => {
        //     const news_thairath = []
        //     snapshot.forEach(doc => {
        //         const data = doc.data()
        //         news_thairath.push(data)
        //     })
        //     this.setState({news_thairath:news_thairath})
        // }).catch(error => console.log(error))
    })

      }
    
    render() {
      return (
        
          <div className='visual-main App-link'>
          {/* <PivotTableUI
               data={data}
                onChange={s => this.setState(s)}
                {...this.state}
            /> */}
            <h3 className='heading'>วิเคราะห์ปัญหา</h3>
          <div  className='App-line mb-3'></div>
            {/* <div class="alert alert-danger" role="alert">
                  <h4 class="alert-heading">Sorry This feature is on developing...</h4>
                  <p>ขออภัย ฟีเจอร์นี้อยู่ในระหว่างการพัฒนา...</p>
                  <hr></hr>
                  <p class="mb-0">ขออภัยในความไม่สะดวก</p>
            </div>
            <div className='center-img'>
                <img src={developing}/>
            </div> */}
            <div className='row mt-5'>
              <div className='col-8'>
                  <div className=''>
                    <Bar
                    // height={'350%'}
                    data={data}
                    options={{
                      title:{
                        display:true,
                        text:'ปัญหาอาชญากรรมที่เกิดขึ้นในประเทศไทย',
                        fontSize:20,
                        fontFamily: 'Prompt'
                      },
                      legend:{
                        display:false,
                        position:'right'
                        }
                      }}
                    />
                  </div>                                 
                
              </div>
              <div className='col-4'>
              <div className="card bg-light mt-3">
                    <div className="card-header">คัดเลือกข้อมูลของปัญหา</div>
                    <FormControl className='mt-3 mb-4 ml-3 mr-3'>
                    <InputLabel htmlFor="uncontrolled-native">หัวข้อปัญหาที่ต้องการทราบ</InputLabel>
                    <NativeSelect
                      defaultValue={60}
                      inputProps={{
                        name: 'name',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>การเมือง</option>
                      <option value={20}>อุบัติเหตุ</option>
                      <option value={30}>จราจร</option>
                      <option value={40}>ภัยพิบัติ</option>
                      <option value={50}>COVID-19</option>
                      <option value={60}>อาชญากรรม</option>
                    </NativeSelect>
                    {/* <FormHelperText>Uncontrolled</FormHelperText> */}
                  </FormControl>
                    {/* <FormControl className='mt-3 mb-4 ml-3 mr-3' >
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            หัวข้อปัญหาที่ต้องการทราบ
                        </InputLabel>
                        <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        // value={age}
                        // onChange={handleChange}
                        // displayEmpty
                        // className={classes.selectEmpty}
                        >
                        <MenuItem value="">
                            <em>จราจร</em>
                        </MenuItem>
                        <MenuItem value={10}>อาชญากรรม</MenuItem>
                        <MenuItem value={20}>การเมือง</MenuItem>
                        <MenuItem value={30}>อุบัติเหตุ</MenuItem>
                        <MenuItem value={40}>สภาพแวดล้อม</MenuItem>
                        <MenuItem value={50}>ภัยพิบัติ</MenuItem>
                        </Select>
                    </FormControl> */}
                    <FormControl className=' ml-3 mr-2' component="fieldset" >

                        <FormLabel className='' component="legend">คัดเลือกแหล่งของปัญหา</FormLabel>
                        <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked='gilad' name="gilad" />}
                            label="ทั้งหมด"
                        />
                        <FormControlLabel
                            control={<Checkbox   name="jason" />}
                            label="ปัญหาสำนักข่าว"
                        />
                        <FormControlLabel
                            control={<Checkbox   name="antoine" />}
                            label="ปัญหาจากผู้ใช้"
                        />
                        </FormGroup>
                    </FormControl>
                    <form className='ml-3 mr-3 mb-3' noValidate>
                    {/* <TextField
                        id="datetime-local"
                        label="เลือกวันที่ของปัญหาที่ต้องการทราบ"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        // className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    /> */}
                    </form>
                    </div>
              </div>
            </div>
                
          </div>       
        
          );
        }
     }
export default Visualize;
