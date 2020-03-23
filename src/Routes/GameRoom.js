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
        for (let i = 0; i < game.maxplayers - 1; i++) {
            playerCards.push(<Grid item ><UserCard type="player" /></Grid>)
        }
        console.log(playerCards)
        return playerCards
    }

    const findHost = () => {
        if (game){
            let host = game.users.find(user => user.id === game.host_id)
            return <UserCard type="host" player={host} />
        }
    }

    return(
        <div>
            <Typography variant={"h4"}>Room: {game.name}</Typography>
            <Grid container spacing={4}>
                <Grid item md={4}>
                    
                </Grid>
                <Grid item>
                    {findHost()}
                </Grid>
                <Grid item>
                    {parseInt(game.host_id) === parseInt(localStorage.user_id) && <Button variant="contained" color="primary"> Generate Zoom Link </Button>}
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