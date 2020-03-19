import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Signup from './Routes/Signup'
import Login from './Routes/Login'
import AddGames from './Routes/AddGames'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
<Router>
    <Route exact path="/" component={App} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/addgames" component={AddGames} />
</Router>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
