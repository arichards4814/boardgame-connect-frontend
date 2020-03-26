import React, { useState, useEffect } from 'react';
import '../App.css';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import GamesIcon from '@material-ui/icons/Games';
import GroupIcon from '@material-ui/icons/Group';
import Box from '@material-ui/core/Box';
import TopNav from "../Components/TopNav.js"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CurrentRoomCard from '../Components/CurrentRoomCard'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

//test commit
function Home(props) {
    const classes = useStyles();
    const [userBoardGames, setUserBoardGames] = React.useState([]);
    const [user, setUser] = React.useState("");
    const [usersCurrentRooms, setUsersCurrentRooms] = React.useState([])



    useEffect(() => {
        fetch(`http://localhost:3000/users/${localStorage.user_id}`)
            .then(response => response.json())
            .then(response => {
                setUserBoardGames(response.boardgames)
                setUser(response)
                fetch(`http://localhost:3000/users/${localStorage.user_id}/rooms`)
                .then(resp => resp.json())
                .then(body=> {
                    setUsersCurrentRooms(body)
                })
            })
    }, []);

    const goToGame = (id) =>{
        props.history.push(`/rooms/${id}`)
    }

    const handleGameClick = (event) => {
        props.history.push(`/boardgames/${event.target.id}`)
    }

    const renderCurrentGames = () => {
        return usersCurrentRooms.map(room => <CurrentRoomCard key={room.id} {...room} goToGame={goToGame}/>)
    }

    return (
        <div>
            <TopNav history={props.history}/>
            <Grid container style={{marginTop: 70}} spacing={3}>
                <Grid item md={3} align="center" style={{ paddingTop: 60 }}>
                    <img style={{width: 200}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1024px-User_font_awesome.svg.png"></img>
                    <Typography variant="body2">{user.name}</Typography>
                    <Typography variant="h6">Current Rooms:</Typography>
                    {renderCurrentGames()}
                </Grid>
                <Grid item md={8}>
                    <h1 id="home-h1"> Welcome to Boardgame Connect, {user.name}! </h1>
                    <h2>It's game time </h2>
                    <Button variant="contained" color="primary" onClick={() => props.history.push("/opengamerooms")}> <GroupIcon /></Button> <h3 style={{ display: "inline-block" }}> Join a Game! </h3>
                    <br />
                    <Button variant="contained" color="secondary" onClick={() => props.history.push("/hostagame")}> <AccessibilityNewIcon /></Button> <h3 style={{ display: "inline-block" }}> Host a Game! </h3>
                    <br />
                    <Button variant="contained" style={{ color: "orange" }} onClick={() => props.history.push("/addgames")}> < GamesIcon /> </Button> <h3 style={{ display: "inline-block" }}> Add to your board games! </h3>
                    <h5> Games you own: </h5>
                    <Box id="owned-games-box">
                        {userBoardGames && userBoardGames.map(boardgame =>
                            <span key={boardgame.id}> <img id={boardgame.id} onClick={(event) => handleGameClick(event)} className="home-game-images" src={boardgame.image_url} />  </span>
                        )}
                    </Box>
                </Grid>
                <Grid item md={1}>
                    
                </Grid>
            </Grid>
        </div>
    );
}
export default Home;