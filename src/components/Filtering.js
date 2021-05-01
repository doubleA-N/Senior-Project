import React from 'react';
import 'react-pivottable/pivottable.css';
import { db, auth} from '../data/firebase'
// import firebase from 'firebase/app';
// import { FireSQL } from 'firesql';
import 'firebase/firestore';
import '../CSS/App.css';
import '../CSS/Filtering.css';
import 'fontsource-prompt';
import 'bootstrap/dist/css/bootstrap.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'


class Filtering extends React.Component {
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
        

    })
            
      }
    
    
    render() {
    
      return (
        
          <div className=''>
                   <div className="card bg-light mt-3">
                    <div className="card-header">คัดเลือกข้อมูลของปัญหา</div>
                    <p className='mt-2 ml-2 mb-0'>เลือกหัวข้อของปัญหา</p>
                    <DropdownButton variant="outline-secondary" className='ml-2' id="dropdown-basic" title="หัวข้อทั้งหมด">
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                    <fieldset>
                      <p className='mt-2 ml-2 mb-0'>เลือกแหล่งที่มาของปัญหา</p>
                      <Form.Group className='ml-2'>
                          <Form.Check
                            type="radio"
                            label="ทั้งหมด"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                          />
                          <Form.Check
                            type="radio"
                            label="จากสำนักข่าว"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                          />
                          <Form.Check
                            type="radio"
                            label="จากผู้ใช้งาน"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                          />
                        
                      </Form.Group>
                    </fieldset>
                    
                    </div> 

          </div>       
        
          );
        }
     }
export default Filtering;
