import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../CSS/AdminLogin.css';
import { db, auth} from '../data/firebase'

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            user:null,
            password:null,
            admin:null ,
            allAdmin:null         
        };
    }

    updateUser = e =>{
        this.setState({user: e.target.value})
    }
    
    updatePass = e =>{
        this.setState({password: e.target.value})
    }
    
    componentDidMount() {
        db.collection('login_admin')
            .get()
            .then( snapshot => {
                snapshot.forEach(doc => {
                this.setState({allAdmin:doc.data()})
                console.log(doc.data())
            })
                
        }).catch(error => console.log(error))   
    }
    
    login = e =>{
        e.preventDefault();
        // console.log(this.state.allAdmin.ID)
        // console.log(this.state.user,this.state.password)

        let query = db.collection('login_admin')
        let correctUser = query.where('ID','==', this.state.user).where('Pass','==', this.state.password)
        
        if(this.state.user == this.state.allAdmin.ID){
            if(this.state.password == this.state.allAdmin.Pass){
                correctUser.get()
                .then( snapshot => {
                     
                    snapshot.forEach(doc => {
                        this.setState({admin:doc.data()})
                        console.log(doc.data())
                    })
                    
                window.location = '/CheckFakeNews'
                }).catch(error => console.log(error))
            }
            else{
                alert('Wrong Password')
            }
   
        }
        else{
           alert('Wrong Username')
        }   
    }

    render() {
        return (    
            <div className='container'>
            <div className='login-main'>    
            <h3>Log in</h3>
            
            <Form onSubmit={this.login}>
            <Form.Group >
                <Form.Label>Username</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter Username"
                onChange={this.updateUser}
                value={this.state.user}
                 />
                
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Enter Password"
                onChange={this.updatePass}
                value={this.state.password} />
            </Form.Group>
            
            <Button 
            variant="primary" size="lg" 
            className='button' 
            type="submit"
            >
                เข้าสู่ระบบ
            </Button>
            </Form>
            </div>
            
            </div>
        );
    }
}
export default AdminLogin;