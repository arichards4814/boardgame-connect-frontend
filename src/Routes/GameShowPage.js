import React, { useState, useEffect } from 'react';
import MilesNav from "../Components/MilesNav.js"


function GameShowPage(props) {

    const [game, setGame] = useState("");
    useEffect(() => {
        //fetch specific game details
        fetch(`http://localhost:3000/boardgames/${props.match.params.id}`)
            .then(resp => resp.json())
                .then(body => {
                    setGame(body)
                    console.log(body)
                })
    }, []);

    return(
        <div>
            <MilesNav history={props.history}/>
            <h1>{game.name}</h1>
        </div>
    )
}

export default GameShowPage