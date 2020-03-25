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
            })
        }, 
    []);


    return (
    <div>
    {/* <TopNav /> */}
        <div className="wrapper">     
            <div>
                sussssususjjsjsjjsjsjjsjs
            </div>
            <div>
                blehhhh
            </div>
            <div>
                sussssususjjsjsjjsjsjjsjs
            </div>
            <div>
                blehhhh
            </div>
        </div>
    </div>
    )
}

export default GameShowPage