import React from 'react';
import { db, auth, provider } from '../data/firebase';
import Sidebar from './Sidebar';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
        user: null 
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    } 
    handleChange(e){

    }

    logout(){
        auth.signOut()
        .then(() => {
            this.setState({
                user:null                
            });
        })
    }
    login() {
        auth.signInWithPopup(provider)
        .then((result => {
            const user = result.user;
            this.setState({
                user,
                
            });
        }))
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
            }
        })
    }

    render(){
        return(
            <div>
                <h2>LOGIN</h2>
                {this.state.user ?
                <button onClick={this.logout}>Log Out</button>
                :
                <button onClick={this.login}>Log In</button>
                }
                {this.state.user ?
                    <div>
                    <div className=''>
                        <h1>{this.state.user.displayName}</h1>
                        <img src={this.state.user.photoURL} />
                        {console.log(this.state.user)}
                    </div>
                    </div>
                    :
                    <div className=''>
                    <p>You must be logged in to see the potluck list and submit to it.</p>
                    </div>
                }
                
            </div>
        )
    }

}
export default Login;