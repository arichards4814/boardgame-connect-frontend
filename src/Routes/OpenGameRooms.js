import React, { useState, useEffect } from 'react';

function OpenGameRooms() {

    const [boardgames, setBoardgames] = useState([]);
    
  

    // Similar to componentDidMount and componentDidUpdate:
      useEffect(() => {
      // if the fetch doesnt work check the id, dropping the db changes the ID
          fetch(`http://localhost:3000/boardgames`)
          .then(response => response.json())
          .then(response => {
            setBoardgames(response)
          })
        }, []);

    return (
        <div className="open-gameroom-div">
           <h1 id="open-game-room-h1">Open game rooms</h1>
           <h5 id="open-game-room-h5">Based on the boardgames you own:</h5>
           {boardgames.map( game => 
            <div key={game.id}> 
              <h2>{game.name}:</h2>
                <div className="homes-games-collection">
                    {game.rooms.map( room => <p> {room.name}</p>)}
                </div>  
            </div>
          )}
        </div>
    );
}

export default OpenGameRooms;