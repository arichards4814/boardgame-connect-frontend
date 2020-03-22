import React, { useState, useEffect } from 'react';

function OpenGameRooms() {

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
        <div className="open-gameroom-div">
           <h1 id="open-game-room-h1">Open game rooms</h1>
           <h5 id="open-game-room-h5">Based on the boardgames you own:</h5>
           {boardgames.map( game => 
            <div key={game.id}> 
              <h2>{game.name}:</h2>
                <div className="homes-games-collection">
                    {game.rooms.map( room => 
                    <div>   
                        <h4 className="margin-left-5"> Room Name: {room.name}</h4>
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
        </div>
    );
}

export default OpenGameRooms;