import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import GamesIcon from '@material-ui/icons/Games';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


//test commit

function App(props) {
  const classes = useStyles();
  const [userBoardGames, setUserBoardGames] = React.useState([]);
  

  // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
    // if the fetch doesnt work check the id, dropping the db changes the ID
        fetch(`http://localhost:3000/users/6`)
        .then(response => response.json())
        .then(response => {
            setUserBoardGames(response.boardgames)
        })
      }, []);
    

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BoardGame Connect (Maybe make this text the logo image? )
          </Typography>
          <Button color="inherit" onClick={() => props.history.push("/")}> < HomeIcon /> </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" >
        <div className="home-div">
          <h1> Welcome (USER TO BE FILLED IN AFTER AUTH)</h1> 
          <h2>It's game time </h2>
          <Button variant="contained" color="primary" onClick={() => props.history.push("/opengamerooms")}> <GroupIcon/></Button> <h3 style={{ display: "inline-block" }}> Join a Game! </h3> 
          <br/>
          <Button variant="contained" color="secondary" > <AccessibilityNewIcon/></Button> <h3 style={{ display: "inline-block" }}> Host a Game! </h3> 
          <br/>
          <Button variant="contained" style={{color: "orange"}} onClick={() => props.history.push("/addgames")}> < GamesIcon /> </Button> <h3 style={{ display: "inline-block" }}> Add to your board games! </h3> 
          <h5> Games you own: </h5>
          <div className="homes-games-collection">   
            <ul>
              {userBoardGames && userBoardGames.map( boardgame => 
              <span key={boardgame.id}> <img id="home-game-images" src={boardgame.image_url}/>  </span>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </div>
    );
}

export default App;
