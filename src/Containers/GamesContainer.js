import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import GameCard from '../Components/GameCard'
import Button from '@material-ui/core/Button';
import Search from '../Components/Search'
import fetchCatan from '../requests'
import ChosenGames from '../Components/ChosenGames'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(6),
    },
}));

export default function GamesContainer(props) {

    const [spacing, setSpacing] = React.useState(2);
    const [indexOfSearch, setIndexOfSearch] = React.useState(0)
    const classes = useStyles();
    const [games, setGames] = React.useState([])
    const [search, setSearch] = React.useState("")

    const renderGames = () => {
        let sixGames = games.slice(indexOfSearch, indexOfSearch + 6)

        return sixGames.map(game => <Grid item mdclassName={classes.control} ><GameCard key={game.id} {...game} /></Grid>)
    }

    const nextIndex = () => {
        if (indexOfSearch + 7 > games.length) {
            setIndexOfSearch(0)
        } else {
            setIndexOfSearch(indexOfSearch + 7)
        }
    }

    const previousIndex = () => {
        if (indexOfSearch - 7 < 0) {
            setIndexOfSearch(games.length - 7)
        } else {
            setIndexOfSearch(indexOfSearch - 7)
        }
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        fetchCatan(search).then(resp => resp.json())
            .then(body => setGames(body.games))
    }

    const addToChosen = (id) => {
        console.log("Chosen Game", id)
    }


    return (
        <div>
            
            <Grid container >
                <Grid tile md={1} style={{ textAlign: "center" }}>
                </Grid>
                <Grid tile md={3} style={{textAlign: "center"}}>
                    <Paper style={{ padding: 10 }}>
                        <Search search={search} handleChange={handleChange} handleSubmit={handleSubmit} />
                    </Paper>
                </Grid>
                <Grid tile md={6} style={{ textAlign: "center" }}>
                    <Paper style={{ padding: 10 }}>
                        <ChosenGames />
                    </Paper>
                </Grid>
            </Grid>
            <Paper className={classes.control} >
                <Button variant="outlined" color="primary" onClick={previousIndex}>Previous</Button>
                <Button variant="outlined" color="primary" onClick={nextIndex}>Next</Button>
                
                {games.length > 0 && <Typography variant="subtitle1" component="h2">Viewing: {indexOfSearch} - {indexOfSearch + 6} out of {games.length}</Typography>}
                
                <Grid className={classes.root} container spacing={3}>
                    {
                        renderGames()
                    }
                </Grid>
            </Paper></div>)
}

