import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

const thepink = pink[300]

const useStyles = makeStyles(theme => ({
    paper: { 
        "&:hover": {
            cursor: "pointer",
            backgroundColor: thepink
        }
    }
}));

export default function CurrentRoomCard(props){

    const classes = useStyles()
   
console.log(props)
return(
    <Paper elevation={3} className={classes.paper} style={{margin: 10, height: 60, backgroundColor: thepink}} onClick={() => props.goToGame(props.id)}>
        {props.name}

    <Typography variant="body2">{props.users.length} / {props.maxplayers} players</Typography>
    </Paper>
)

}