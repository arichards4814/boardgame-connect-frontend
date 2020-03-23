import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import TopNav from "../Components/TopNav.js"


const useStylesCard = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function OpenGameRooms(props) {
    const [boardgames, setBoardgames] = useState([]);
    const [fetchedRooms, setRooms] = useState([]);
  
      useEffect(() => {
          fetch(`http://localhost:3000/boardgames`)
          .then(response => response.json())
          .then(response => {
            setBoardgames(response)
          })
           fetch(`http://localhost:3000/rooms`)
          .then(response => response.json())
          .then(response => {
            setRooms(response)
})}, []); 
 
const handleJoinClick = (event) => {
  props.history.push(`/rooms/${event.target.parentNode.id}`)
}
  


  return (
    <div>
    <TopNav history={props.history}/>
      <Container maxWidth="sm" >
           <h1 id="open-game-room-h1">Open game rooms</h1>
           {/* <h5 id="open-game-room-h5">Based on the boardgames you own:</h5> */}
            {boardgames.map( game => 
            <Box key={game.id} className="open-game-room-box" borderRadius={16}> 
              <h2 id="open-game-room-name">{game.name}:</h2>
                    {game.rooms.length > 0 ? game.rooms.map( room => 
                    <Card variant="outlined" className="game-room-card">
                      <CardContent className="game-room-card-content">
                        {<h4 className="margin-left-5"> Room Name: {room.name}</h4>}
                        <h6 className="zoom-url"> Zoom url: {room.zoom_url} </h6> 
                        <h5 className="margin-left-5"> Users:</h5>
                        <ul> 
                            {(fetchedRooms.find(fetchRoom => fetchRoom.id == room.id)).users.map( user => <h6 className="user-list" key={user.id}> {user.name} </h6> )}
                        </ul>
                      </CardContent>
                      <CardActions>
                        <Button id={room.id} size="small" bgcolor="secondary.main" onClick={(event) => handleJoinClick(event)}> Join </Button>
                      </CardActions>
                    </Card>)
                    :
                    <Card variant="outlined" className="game-room-card">
                      {<h4 id="no-room-active-text"> No Rooms yet!</h4>}
                    </Card>
                    }
            </Box>)}
      </Container>
 </div>
  );
}
export default OpenGameRooms;