import React, { useState, useEffect } from 'react';
import '../App.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import GamesIcon from '@material-ui/icons/Games';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';


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
    useEffect(() => {
        fetch(`http://localhost:3000/users/${localStorage.user_id}`)
            .then(response => response.json())
            .then(response => {
                setUserBoardGames(response.boardgames)
                setUser(response)
            })
    }, []);

    const handleGameClick = () => {
        alert("I will be a route for the Game Show page?")
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        BoardGame Connect (Maybe make this text the logo image? )
                    </Typography>
                    <Button color="inherit" onClick={() => props.history.push("/")}> < HomeIcon /> </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" >
                    <h1> Welcome to Boardgame Connect, {user.name}! </h1>
                    <h2>It's game time </h2>
                    <Button variant="contained" color="primary" onClick={() => props.history.push("/opengamerooms")}> <GroupIcon /></Button> <h3 style={{ display: "inline-block" }}> Join a Game! </h3>
                    <br />
                    <Button variant="contained" color="secondary" onClick={() => props.history.push("/hostagame")}> <AccessibilityNewIcon /></Button> <h3 style={{ display: "inline-block" }}> Host a Game! </h3>
                    <br />
                    <Button variant="contained" style={{ color: "orange" }} onClick={() => props.history.push("/addgames")}> < GamesIcon /> </Button> <h3 style={{ display: "inline-block" }}> Add to your board games! </h3>
                    <h5> Games you own: </h5>
                    <Box id="owned-games-box">
                            {userBoardGames && userBoardGames.map(boardgame =>
                                <span key={boardgame.id}> <img onClick={() => handleGameClick()} className="home-game-images" src={boardgame.image_url} />  </span>
                            )}
                    </Box>
            </Container>
        </div>
    );
}
export default Home;