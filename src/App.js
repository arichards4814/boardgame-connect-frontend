import React from 'react';
import './index.css';
import './App.css'
import Home from './Routes/Home'
import Signup from './Routes/Signup'
import Login from './Routes/Login'
import AddGames from './Routes/AddGames'
import OpenGameRooms from './Routes/OpenGameRooms'
import { BrowserRouter as Router, Route} from 'react-router-dom';

class App extends React.Component {

state = {
  currentUser: null
}

componentDidMount(){
  const user_id = localStorage.user_id
  console.log(user_id)
  if (user_id){
    //get user info
    console.log("Inside the user id if statement")
    fetch('http://localhost:3000/auto_login', {
      headers: {
        "Authorization": user_id
      }
    })
    .then(res=> res.json())
    .then(response => {
      if (response.errors){
        alert(response.errors)
      } else {
        this.setState({currentUser: response})
      }
    })
    }
    
  }


setUser = (user) => {
  this.setState({ currentUser: user }, () => {
  localStorage.user_id = user.id
    this.props.history.push("/")
  })
}

logout = () => {
  this.setState({ currentUser: null }, () => {
    localStorage.removeItem("user_id")
    this.props.history.push("/login")
  })
}

//here check if logged in on all pages and route accordingly

render(){
  console.log("current user", this.state.currentUser)
  return (
  <Router>
    <Route exact path="/" render={(routerProps) => <Home {...routerProps} user={this.state.currentUser} logout={this.logout}/>} />
    <Route path="/signup" render={(routerProps) => <Signup {...routerProps} setUser={this.setUser}/>} />
    <Route path="/login" render={(routerProps) => <Login {...routerProps} setUser={this.setUser}/>} />
    <Route path="/addgames" component={AddGames} />
    <Route path="/opengamerooms" component={OpenGameRooms} />
  </Router>)
}
}

export default App