import React from 'react';
import GamesContainer from '../Containers/GamesContainer';
import Typography from '@material-ui/core/Typography';

function AddGames() {
    return (
        <div>
            <Typography variant="h4" component="h2">Choose the Games You Own</Typography>
            <GamesContainer />
        </div>
    );
}

export default AddGames;