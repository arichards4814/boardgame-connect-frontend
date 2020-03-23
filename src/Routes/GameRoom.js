import React, { useState, useEffect } from 'react';


function GameRoom(props) {

    console.log(props.match.params.id)

    const [game, setGame] = useState("");


    useEffect(() => {
        //fetch specific game details
        fetch(`http://localhost:3000/rooms/${props.match.params.id}`)
            .then(resp => resp.json())
                .then(body => setGame(body))
    }, []);

    console.log(game)

    return(
        <div>
            <h1>{game.name}</h1>
        </div>
    )
}

export default GameRoom