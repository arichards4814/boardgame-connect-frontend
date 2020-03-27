import React from 'react';
import GamesContainer from '../Containers/GamesContainer';
import Grid from '@material-ui/core/Grid';
import TopNav from '../Components/TopNav'

function AddGames(props) {
    return (
        <div style={{marginTop: 90}}>
            <Grid container >
                <TopNav {...props}/>
                <Grid item md={2}>
                </Grid>
                <Grid item >
                    
                </Grid>
                <Grid item md={2}>
                    
                </Grid>
                <Grid item>
                 </Grid>
            </Grid>
            <GamesContainer />
        </div>
    );
}

export default AddGames;