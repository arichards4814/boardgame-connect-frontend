import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    usersMessage: {
        backgroundColor: "#b985ed",
        padding: 10,
        textAlign: "right",
        display: "inline-block",
        float: "right",
        margin: 1
    },
    otherPlayersMessage: {
        backgroundColor: "#85dfed",
        padding: 10,
        display: "inline-block",
        margin: 1
    }
}));

export default function ChatBubble(props){

    const classes = useStyles();


    const [usersMessage, setUsersMessage] = useState(classes.otherPlayersMessage);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        //fetch specific game detail
        fetch(`http://localhost:3000/users/${props.user_id}`)
        .then(resp => resp.json())
        .then(body => {
            // console.log("body", body)
            setUserName(body.name)})
        .then(b => {
        if (props.user_id == localStorage.user_id) {
        setUsersMessage(classes.usersMessage)
    }})}, []);

return(
    <div>
    <Paper className={usersMessage}>
        {userName}: {props.message_content}
    </Paper>
    <div style={{height: 10}}></div>
    </div>
)

}