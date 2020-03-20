import React, { useState, useEffect }  from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TinyGameCard from '../Components/TinyGameCard'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function ChosenGames(props) {

    const [ready, setReady] = useState(false);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if(props.games.length > 0){
            setReady(true)
        } else {
            setReady(false)
        }
    })

    const renderTinyCards = () => {
        return props.games.map(game => <TinyGameCard {...game}/>)
    }

    const addChosenGamesToDatabase = () => {
        
        props.games.forEach(game => {
            fetch('http://localhost:3000/boardgames', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(game)
            }).then(props.clearChosen())
                .then(setOpen(true))
        })
        //clears the chosen array
        //then pop up with the cool green thing.
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    
    return (
        <div>
            <Grid style={{ height: 100, overflow: "scroll", padding: 2}}>
                {renderTinyCards()}
            </Grid>
    {ready ? <Button variant="contained" color="primary" onClick={addChosenGamesToDatabase}>Add {props.games.length} Game{props.games.length > 1 && "s"} to Collection</Button> :
                <Button disabled variant="contained" color="primary" onClick={addChosenGamesToDatabase}>Add Games to Collection</Button>}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    You have successfully added to your Collection!
                </Alert>
            </Snackbar>
        </div>
    );
}
