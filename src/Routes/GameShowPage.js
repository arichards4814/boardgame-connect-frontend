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


        return (
        <div>
        {/* <TopNav /> */}
            <div id="game-show-image-div">                
            </div>
            <div id="right-game-show-div">

            </div>
        </div>
        )
}

export default GameShowPage