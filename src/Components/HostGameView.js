import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

export default function HostGameView(props){

    {console.log(props)}

    return(
        <Paper>
            <Grid container spacing={3} style={{paddingLeft: 8}}>
                <Grid item>
                    <img src={props.chosenGame ? props.chosenGame.image_url : './images/boardgame_placeholder.png'} style={{height: 130, width: 160}}></img>
                </Grid>
                <Grid item>
                    <Typography variant="h4" align="left">Game: {props.chosenGame && props.chosenGame.name}</Typography>
                    <Typography variant="body1" align="left">Minimum # of Players: {props.chosenGame && props.chosenGame.min_players}</Typography>
                    <Typography variant="body1" align="left">Maximum # of Players: {props.chosenGame && props.chosenGame.max_players}</Typography>
                    <Typography variant="body1" align="left">Minimum Play Time: {props.chosenGame && props.chosenGame.min_playtime} minutes</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}