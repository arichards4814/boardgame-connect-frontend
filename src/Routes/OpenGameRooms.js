import React, { useState, useEffect } from 'react';

function OpenGameRooms() {

    const [rooms, setRooms] = React.useState([]);
  

    // Similar to componentDidMount and componentDidUpdate:
      useEffect(() => {
      // if the fetch doesnt work check the id, dropping the db changes the ID
          fetch(`http://localhost:3000/rooms`)
          .then(response => response.json())
          .then(response => {
            if(rooms.length === 0){
              console.log(response)
            setRooms(response)
            }
          })
        });


    return (
        <div className="open-gameroom-div">
           <h1 id="open-game-room-h1">Open game rooms</h1>
           <h5 id="open-game-room-h5">Based on the boardgames you own:</h5>
           {rooms.map( room => 
            <div key={room.id}> 
              <h2>{room.boardgame.name}:</h2>
                <div className="homes-games-collection">

                </div>  
            </div>
          )}
        </div>
    );
}

export default OpenGameRooms;