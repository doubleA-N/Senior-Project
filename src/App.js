import React from 'react';
// import { db, auth} from 'data/firebase'
import './CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from './components/Sidebar';
import Mapping from './components/Mapping';
import AddData from './components/AddData';
import { BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';
import Content from './components/Content';
import Visualize from './components/Visualize';
import Profile from './components/Profile';
import CheckFakeNews from './components/CheckFakeNews';
import AdminLogin from './components/AdminLogin'
import AdminSidebar from './components/AdminSidebar';

const LoginContainer = () => (
  <div >
    <Route path="/AdminLogin" exact component={AdminLogin} />
    
  </div>
)
const AdminCheck = () => (
  <div>
    <AdminSidebar />
    <div className='content'>
    <Route path='/CheckFakeNews' exact component={CheckFakeNews} />
    </div>
  </div>
)

const DefaultContainer = () => (
  <div>
   <Sidebar />
        <div className='content'>
            <Route path='/' exact component={Mapping} />
            <Route path='/AddData' exact component={AddData} />
            <Route path='/Content' exact component={Content} />
            <Route path='/Visualize' exact component={Visualize}/>
            <Route path='/Profile' exact component={Profile} />
          
        </div>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    user: null
    };
  }
  // componentDidMount() {
        
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({user});
  //       console.log(user)
  //     }
  //   })
    
  // }
  render() {
    return (
      
  
      <div className='App'>
      
      <BrowserRouter>
         
        
          <Switch>
            <Route path='/AdminLogin' exact component={LoginContainer} />
            <Route path='/CheckFakeNews' exact component={AdminCheck} />
            <Route component={DefaultContainer}/>
            {/* <Route path='/CheckFakeNews' exact component={CheckFakeNews} />
            <Route path='/AddData' exact component={AddData} />
            <Route path='/Content' exact component={Content} />
            <Route path='/Visualize' exact component={Visualize}/>
            <Route path='/Profile' exact component={Profile} /> */}
          </Switch>  
        
      </BrowserRouter>
      </div> 
      );
  }
  
}

export default App;
