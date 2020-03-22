import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

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

function OpenGameRooms(props) {
    const classes = useStyles();
    const [boardgames, setBoardgames] = useState([]);
    const [fetchedRooms, setRooms] = useState([]);
  

    // Similar to componentDidMount and componentDidUpdate:
      useEffect(() => {
      // if the fetch doesnt work check the id, dropping the db changes the ID
          fetch(`http://localhost:3000/boardgames`)
          .then(response => response.json())
          .then(response => {
            setBoardgames(response)
          })
        }, []);

    // Similar to componentDidMount and componentDidUpdate:
      useEffect(() => {
      // if the fetch doesnt work check the id, dropping the db changes the ID
          fetch(`http://localhost:3000/rooms`)
          .then(response => response.json())
          .then(response => {
            setRooms(response)
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
           <h1 id="open-game-room-h1">Open game rooms</h1>
           <h5 id="open-game-room-h5">Based on the boardgames you own:</h5>
           {boardgames.map( game => 
            <div key={game.id}> 
              <h2>{game.name}:</h2>
                <div className="homes-games-collection">
                    {game.rooms.map( room => 
                    <div>   
                        {room.name.length ?  <h4 className="margin-left-5"> Room Name: {room.name}</h4> : <h4> No Rooms yet! </h4>}
                        <h6 className="zoom-url"> Zoom url: {room.zoom_url} </h6> 
                        <h5 className="margin-left-5"> Users:</h5>
                        <ul> 
                            {(fetchedRooms.find(fetchRoom => fetchRoom.id == room.id)).users.map( user => <h6 className="user-list" key={user.id}> {user.name} </h6> )}
                        </ul>
                    </div>
                    )}
                </div>  
            </div>
          )}
      </Container>
    </div>
    );
}

export default OpenGameRooms;