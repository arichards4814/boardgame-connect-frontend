import React from 'react';
import GamesContainer from '../Containers/GamesContainer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import NavFloat from '../Components/NavFloat'

function AddGames(props) {
    return (
        <div>
            <Grid container >
                <Grid item md={2}>
                </Grid>
                <Grid item >
                    <h1>Add some games to your Collection:</h1>
                </Grid>
                <Grid item md={2}>
                    
                </Grid>
                <Grid item>
                    <NavFloat goToRooms={() => props.history.push("/opengamerooms")} goHome={() => props.history.push("/")}/>
                </Grid>
            </Grid>
            <GamesContainer />
        </div>
    );
}

export default AddGames;