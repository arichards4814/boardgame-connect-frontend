import React from 'react';
import GamesContainer from '../Containers/GamesContainer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import NavFloat from '../Components/NavFloat'
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
                    {/* <NavFloat goToRooms={() => props.history.push("/opengamerooms")} goHome={() => props.history.push("/")}/> */}
                </Grid>
            </Grid>
            <GamesContainer />
        </div>
    );
}

export default AddGames;