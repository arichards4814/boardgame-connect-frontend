import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import HostGameView from '../Components/HostGameView'
import URL from "../HostUrl.js"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function HostAGame(props) {

    const [userBoardGames, setUserBoardGames] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [form, setState] = useState({
        name: "",
        boardgame: "",
        maxplayers: 4
    });
    const [validations, setValidations] = useState("")
    const [validationsBoolName, setValidationsBoolName] = useState(false)
    const [validationsBool, setValidationsBool] = useState(false)
    const [userZoomId, setuserZoomId] = useState("")



    const handleChange = (e) => {
        setState({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let chosenBG = chosenGame()

        if (form.maxplayers < chosenBG.min_players || form.maxplayers > chosenBG.max_players){
            setValidations(`Can only have between ${chosenBG.min_players} and ${chosenBG.max_players} players.`)
            setValidationsBool(true)
            setOpen(true)
        } else if (form.name === "") {
            setValidations("A room must have a name.")
            setValidationsBoolName(true)
            setOpen(true)
        } else if (form.boardgame === "" || form.boardgame === "null"){
            setValidations("You must choose a boardgame.")
            setValidationsBoolName(true)
            setOpen(true)
        } else {
            console.log("submit clicked", form)
            // [x] this fetch will be a post to rooms
            // [x]it will create a new room with a room id and then redirect to
            // that specific room
            // [x]also creates a user_rooms connection in a then
            let room_data = {
                name: form.name,
                host_id: localStorage.user_id,
                zoom_url: userZoomId,
                boardgame_id: parseInt(form.boardgame),
                maxplayers: form.maxplayers
            }

            fetch(`http://localhost:3000/rooms`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(room_data)
            }).then(resp => resp.json())
                .then(body=> { 
                    
                    let userroomdata = {
                        user_id: localStorage.user_id,
                        room_id: body.id
                    }
                    
                    fetch(`${URL}/userrooms`,{
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(userroomdata)
                    })
                    
                    props.history.push(`/rooms/${body.id}`)
                })
        }


    }

    useEffect(() => {
        fetch(`${URL}/users/${localStorage.user_id}`)
            .then(response => response.json())
            .then(response => {
                setUserBoardGames(response.boardgames)
                setuserZoomId(response.zoom_id)
                console.log(userZoomId)
            })
    }, []);



    const handleClose = () => {
        setOpen(false)
    }

    const createSelection = () => {
        // this will create the selection of all the boardgames this user has
        // need to ask miles how he was doing this
        // right now it always picks boardgame 16
        if (userBoardGames){
        return userBoardGames.map(boardgame => <option value={boardgame.id}>{boardgame.name}</option>)
        }

    }

    const chosenGame = () => {
        if (userBoardGames && form.boardgame){
            return userBoardGames.find(boardgame => boardgame.id === parseInt(form.boardgame))
        }
    }


    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" >
                <Paper style={{ marginTop: 20 }}>
                    <Typography component="div" style={{ margin: 10, height: '72vh', textAlign: "center" }}>
                        <h1> Host A Game</h1>
                        <h2> Create A Room:</h2>
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField fullWidth margin="dense" required error={validationsBoolName} onChange={handleChange} label="Name Your Room" name="name" />
                            
                            <Select
                                native
                                fullWidth
                                style={{height: 50}}
                                label="Select Your Game"
                                value={form.boardgame}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'boardgame',
                                    id: 'age-native-simple',
                                }}
                            > <option value="null">Choose an Boardgame</option>{createSelection()}</Select>
                            <TextField fullWidth margin="dense" error={validationsBool} onChange={handleChange} type="number" label="Max Number of Players" name="maxplayers" />
                            <Button variant="contained" color="primary" type="submit" style={{ margin: 10 }}> Create Room </Button>
                        </form>
                        
                        <HostGameView chosenGame={chosenGame()} />
                    </Typography>
                </Paper>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {validations}
                 </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default HostAGame