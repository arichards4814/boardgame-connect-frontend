import React from 'react';
import GamesContainer from '../Containers/GamesContainer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function AddGames() {
    return (
        <div>
            <Grid container >
                <Grid item md={2}>
                </Grid>
                <Grid item >
                    <Typography variant="h4" component="h2">Choose the Games You Own</Typography>
                </Grid>
            </Grid>
            <GamesContainer />
        </div>
    );
}

export default AddGames;