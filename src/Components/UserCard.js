import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    player: {
        minWidth: 345,
        maxWidth: 345,
        backgroundColor: "#6aebc4"
    },
    host: {
        minWidth: 345,
        maxWidth: 345,
        backgroundColor: "#6a7feb"
    },
}));

export default function UserCard(props){

    const classes = useStyles();
    const [type, setType] = useState("player")
    const [currentStyle, setCurrentStyle] = useState("current style")

    useEffect(() => { 
        setType(props.type)
        if (type === "player"){
            setCurrentStyle(classes.player)
        } else if (type === "host"){
            setCurrentStyle(classes.host)
        }});


    return(
        <Card className={currentStyle}>
            <CardMedia
                className={classes.media}
                style={{ height: 0, paddingTop: '56.25%' }}
                image={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1024px-User_font_awesome.svg.png"}
                title={"user"}
            />
            <CardContent>
                <Typography variant="h6" >{props.type === "host" ? "Host" : "Player"}</Typography>
                <Typography variant="h5" >{props.player && props.player.name}</Typography>
            </CardContent>
        </Card>
    )


}