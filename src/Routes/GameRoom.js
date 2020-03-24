import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import UserCard from '../Components/UserCard'
import Button from '@material-ui/core/Button';

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

    const renderPlayers = () => {

        // should probably just render each of the people
        // that are already in the room and then check
        // the difference between # of people in and the final amount
        // need to make sure they are not the host on every pass

        let playerCards = []
        // first create the player cards
        if (game.users && game.users.length > 1){
            game.users.forEach(user => {
                if (user.id === game.host_id){

                }else{
                    playerCards.push(<Grid item ><UserCard type="player" player={user}/></Grid>)
                }
                
            })

            for (let i = 0; i < game.maxplayers - game.users.length; i++) {
                playerCards.push(<Grid item ><UserCard type="noplayer" /></Grid>)
            }
        } else {
            for (let i = 0; i < game.maxplayers - 1; i++) {
                playerCards.push(<Grid item ><UserCard type="noplayer" /></Grid>)
            }
        }
        
        return playerCards
    }

    const findHost = () => {
        if (game.users){
            let host = game.users.find(user => user.id === game.host_id)
            return <UserCard type="host" player={host} />
        }
    }

    const userInGame = () => {
        //returns true or false based on
        //whether current user is in the game
        let inGame = false
        if (game.users){
            game.users.forEach(user => { 
                console.log(user.id)
                console.log(localStorage.user_id)
                if (parseInt(user.id) === parseInt(localStorage.user_id)){
                    inGame = true
                }
            })
            return inGame
        }
    }

    return(
        <div style={{marginTop: 30}}>
            <Grid container spacing={4}>
                <Grid item md={2}>
                    
                </Grid>
                <Grid item md={2}>
                    <Typography variant={"h4"}>Room:</Typography>
                    <Typography variant={"h5"}>{game.name}</Typography>
                    <Typography variant={"body1"}>Max Players: {game.maxplayers}</Typography>
                    <Typography variant={"body1"}>Current Players: {game.users && game.users.length} </Typography>
                    <img src={game.boardgame && game.boardgame.image_url} style={{height: 150}}></img>
                </Grid>
                <Grid item>
                    {findHost()}
                </Grid>
                <Grid item>
                    {parseInt(game.host_id) === parseInt(localStorage.user_id) && <Typography variant="h5" > Host Panel:  </Typography>}
                    {parseInt(game.host_id) === parseInt(localStorage.user_id) && <Typography > You are currently the host.  </Typography>}
                    {parseInt(game.host_id) === parseInt(localStorage.user_id) && <Button variant="contained" color="primary"> Generate Zoom Link </Button>}
                    {/* {game.users && game.users.find(user => user.id === localStorage.user_id) ? null : <Button variant="contained" color="primary"> Join Game </Button>} */}
                    {game.users && game.users.length < game.maxplayers && <Typography variant="body1">Waiting for Players</Typography>}
                    {game.users && game.users.length === game.maxplayers && <Typography variant="body1">Game Full</Typography>}
                    {!userInGame() && <Button variant="contained" color="primary"><a href="https://us04web.zoom.us/j/763249912" target="_blank"> Join Game </a></Button>}
                </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={2} justify="center">
                {renderPlayers()}
            </Grid>
            
        </div>
    )
}

export default GameRoom