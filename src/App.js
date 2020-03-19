import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

//test commit

function App() {
  return (
    <div className="home-div">
      <h1> Welcome (USER TO BE FILLED IN AFTER AUTH)</h1> 
      <h2>It's game time </h2>
      <Button variant="contained" color="primary" >+</Button> <h3 style={{ display: "inline-block" }}> Join a Game! </h3> 
      <br/>
      <Button variant="contained" color="primary" >+</Button> <h3 style={{ display: "inline-block" }}> Host a Game! </h3> 
      <br/>
      <Button variant="contained" color="primary" >+</Button> <h3 style={{ display: "inline-block" }}> Add to your board games! </h3> 
      <h5> Games you own: </h5>
      <div className="homes-games-collection">   
      
      </div>
    </div>
  );
}

export default App;
