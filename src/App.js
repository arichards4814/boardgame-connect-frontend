import React from 'react';
import './index.css';
import './App.css'
import Home from './Routes/Home'
import Signup from './Routes/Signup'
import Login from './Routes/Login'
import AddGames from './Routes/AddGames'
import OpenGameRooms from './Routes/OpenGameRooms'
import HostAGame from './Routes/HostAGame'
import GameRoom from './Routes/GameRoom'
import GameShowPage from './Routes/GameShowPage'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import LiveGameRoom from './Routes/LiveGameRoom'
import AboutUs from './Routes/AboutUs'
import { Redirect } from "react-router-dom"

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

userLoggedIn = () => {
  //authed
  if (localStorage.user_id){
    return true
  } else {
    return false
  }

}



//here check if logged in on all pages and route accordingly

render(){
  console.log("current user", this.state.currentUser)
  return (
  <Router>
      <Route exact path="/" render={({ history }) => this.userLoggedIn() ?  <Home history={history} user={this.state.currentUser} logout={this.logout} /> : <Redirect to="/signup"></Redirect>} />
    <Route path="/signup" render={({ history}) => <Signup history={history} setUser={this.setUser}/>} />
    <Route path="/login" render={({ history }) => <Login history={history} setUser={this.setUser}/>} />
    <Route path={`/addgames`} render={(routerProps) => this.userLoggedIn() ? <AddGames {...routerProps} /> : <Redirect to="/signup" />} />
    <Route path={`/opengamerooms`} render={(routerProps) => this.userLoggedIn() ? <OpenGameRooms {...routerProps} /> : <Redirect to="/signup" />} />
    <Route path={`/hostagame`} render={(routerProps) => this.userLoggedIn() ? <HostAGame {...routerProps} /> : <Redirect to="/signup" />} />
    <Route path={`/rooms/:id`} render={(routerProps) => this.userLoggedIn() ? <GameRoom {...routerProps} /> : <Redirect to="/signup" /> } />
    <Route path={`/boardgames/:id`} render={(routerProps) => this.userLoggedIn() ? <GameShowPage {...routerProps} /> : <Redirect to="/signup"></Redirect> }  />
    <Route path="/aboutus" component={AboutUs} />
  </Router>)
}
}

export default App