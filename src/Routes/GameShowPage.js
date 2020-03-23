import React, { useState, useEffect } from 'react';
import TopNav from "../Components/TopNav.js"


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
            <TopNav history={props.history}/>
            <h1 id="gameshow-h1">{game.name}</h1>
        </div>
    )
}

export default GameShowPage