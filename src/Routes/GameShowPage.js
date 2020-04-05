import React, { useState, useEffect } from 'react';
import TopNav from "../Components/TopNav.js"
import Button from '@material-ui/core/Button';
import { URL } from "../HostUrl.js"

function GameShowPage(props) {


    const [game, setGame] = useState("");

    useEffect(() => {
        //fetch specific game details
        fetch(`${URL}/boardgames/${props.match.params.id}`)
            .then(resp => resp.json())
                .then(body => {
                    setGame(body)
            })
        }, 
    []);


    return (
    <div>
    <TopNav history={props.history}/>
        <div className="wrapper"> 
            <div className="box box1">
                <h1 style={{marginLeft: "10%"}}>{game.name}</h1> 
                <p style={{marginLeft: "10%", marginRight: "10%"}}>{game.description_preview}</p>
            </div> 
            <div className="box2" style={{background: "white"}}>
                <img className="game-show-img"src={game.image_url} />
            </div>
            {/* <div className="box3"> */}
                <Button variant="contained" color="secondary" className="price-button"><a style={{color: "white"}} href={`https://www.google.com/search?psb=1&tbm=shop&q=${game.name}+board+game`} target="_blank"> Check Prices for this Game </a></Button>
            {/* </div> */}
            <div className="li-box">
                <ul>
                <li> Minimum Amount of Players</li>
                    <ul>
                        <li>{game.min_players}</li>
                    </ul>
                    <li> Max Amount of Players</li>
                    <ul>
                        <li>{game.max_players}</li>
                    </ul>
                    <li> Minimum Playtime </li>
                    <ul>
                        <li>{game.min_playtime}</li>
                    </ul>
                    <li> Minimum Playtime </li>
                    <ul>
                        <li>{game.min_playtime}</li>
                    </ul>
                    <li> Year Published </li>
                    <ul>
                        <li>{game.year_published}</li>
                    </ul>
                </ul>
            </div>
            <div className="bottom-box" style={{height: "20px", background: "white"}}>
            </div>
        </div>
    </div>
    )
}

export default GameShowPage