import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import UserCard from '../Components/UserCard'
import Button from '@material-ui/core/Button';
import LiveGameRoom from './LiveGameRoom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import RoomInfoCard from '../Components/RoomInfoCard';
import TopNav from '../Components/TopNav'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function GameRoom(props) {


    const [game, setGame] = useState("");
    const [open, setOpen] = React.useState(false);
    const [prompt, setPrompt] = React.useState("");


    useEffect(() => {
        //fetch specific game details
        fetch(`http://localhost:3000/rooms/${props.match.params.id}`)
            .then(resp => resp.json())
                .then(body => setGame(body))
    }, []);

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
                if (parseInt(user.id) === parseInt(localStorage.user_id)){
                    inGame = true
                }
            })
            return inGame
        }
    }


    const fetcher = () => {
        fetch(`http://localhost:3000/rooms/${props.match.params.id}`)
            .then(resp => resp.json())
            .then(body => {
                // this is where the magic happens, but it also breaks... lol
                setGame(body)
                // console.log("body", body)
                // setPrompt(`${body.users[body.users.length - 1].name} has entered the game!`)
                // setOpen(true)
            })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const joinGame = () => {

        //if there is no host, make this player the host.
        if (game.users.length > 0){
        fetch('http://localhost:3000/userrooms', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: localStorage.user_id,
                room_id: game.id
            })
        })} else {
            //make user the host
            fetch('http://localhost:3000/userrooms', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    user_id: localStorage.user_id,
                    room_id: game.id
                })
            }).then(
                fetch(`http://localhost:3000/rooms/${game.id}`,{
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ...game, host_id: localStorage.user_id
                    })
                }
                ).then(resp=> resp.json())
                .then("THIS IS IT", console.log)
            )
        }
    }

    const leaveGame = () => {
        console.log("will have to do a delete here")

        // first fetch user_rooms, 
        // then check if they include this room id
        // then find this specific persons user_room
        fetch('http://localhost:3000/userrooms')
            .then(resp => resp.json())
            .then(body => {
                let foundUserRoom = body.find(room => room.room_id === game.id)
                console.log("FOUND USER ROOM:",foundUserRoom)
                fetch(`http://localhost:3000/userrooms/${foundUserRoom.id}`, {
                    method: "DELETE",
                })
            })
    }

    console.log("game", game)

    return(
        <div style={{marginTop: 80}}>
            <TopNav {...props}/>
            <Grid container spacing={4}>
                <Grid item md={1}>
                </Grid>
                <Grid item md={3}>
                    <RoomInfoCard {...game} leaveGame={leaveGame} userInGame={userInGame}/>
                </Grid>
                <Grid item>
                    {findHost()}
                </Grid>
                <Grid item>
                    {/* Need to go through this lol*/}
                    {parseInt(game.host_id) === parseInt(localStorage.user_id) && <Typography variant="h5" > Host Panel:  </Typography>}
                    {parseInt(game.host_id) === parseInt(localStorage.user_id) && <Typography > You are currently the host.  </Typography>}
                    {game.users && game.users.length < game.maxplayers && <Typography variant="body1">Waiting for Players</Typography>}
                    {game.users && game.users.length === game.maxplayers && <Typography variant="body1">Game Full</Typography>}
                    {!userInGame() && <Button variant="contained" color="primary" onClick={joinGame}>Join Game</Button>}
                    {game.users && game.users.length === game.maxplayers && <Typography variant="body1">Game Full</Typography>}
                    {<Button variant="contained"><a href={`https://us04web.zoom.us/j/${parseInt(game.zoom_url)}`} target="_blank"> Join Zoom Room</a></Button>}

                    <LiveGameRoom room_id={game.id} fetch_room_data={fetcher} />
                </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={2} justify="center">
                {renderPlayers()}
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    {prompt}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default GameRoom