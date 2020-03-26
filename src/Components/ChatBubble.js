import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    usersMessage: {
        backgroundColor: "#b985ed",
        textAlign: "right",
        paddingRight: 10
    },
    otherPlayersMessage: {
        backgroundColor: "#85dfed",
        paddingLeft: 10
    }
}));

export default function ChatBubble(props){

    const classes = useStyles();


    const [usersMessage, setUsersMessage] = useState(classes.otherPlayersMessage);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        //fetch specific game details
        
        // console.log("props", props)
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
    <Paper className={usersMessage}>
        {userName}: {props.message_content}
    </Paper>
)

}