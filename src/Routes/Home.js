import React, { useState, useEffect } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button'

//test commit

function Home(props) {
    const [userBoardGames, setUserBoardGames] = useState([]);


    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // if the fetch doesnt work check the id, dropping the db changes the ID
        fetch(`http://localhost:3000/users/${localStorage.user_id}`)
            .then(response => response.json())
            .then(response => {
                if (userBoardGames.length === 0) {
                    console.log(response.boardgames)
                    setUserBoardGames(response.boardgames)
                }
            })
    }, []);

    if (props.user){
        console.log("current user", localStorage.user_id)
    }

    return (
        <div className="home-div">
            <Button onClick={props.logout}>Logout</Button>
            <h1> Welcome {props.user && props.user.name}</h1>
            <h2>It's game time </h2>
            <Button variant="contained" color="primary" onClick={() => props.history.push("/opengamerooms")}>+</Button> <h3 style={{ display: "inline-block" }}> Join a Game! </h3>
            <br />
            <Button variant="contained" color="primary" >+</Button> <h3 style={{ display: "inline-block" }}> Host a Game! </h3>
            <br />
            <Button variant="contained" color="primary" onClick={() => props.history.push("/addgames")}>+</Button> <h3 style={{ display: "inline-block" }}> Add to your board games! </h3>
            <h5> Games you own: </h5>
            <div className="homes-games-collection">
                <ul>
                    {userBoardGames && userBoardGames.map(boardgame =>
                        <span key={boardgame.id}> <img className="home-game-images" src={boardgame.image_url} />  </span>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Home;
