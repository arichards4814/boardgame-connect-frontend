import React from 'react';
import GamesContainer from '../Containers/GamesContainer';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';

function TinyGameCard(props) {

    console.log("props", props)
    return (
        <div>
            <Paper>
                <Grid container>
                    <Grid tile md={1}>
                    </Grid>
                    <Grid tile md={1}>
                        <img src={props.thumb_url} style={{ height: 30 }} />
                    </Grid>
                    <Grid tile md={8}>
                        <Typography variant="h5" component="h2">{props.name} {props.year_published}</Typography>
                    </Grid>
                </Grid>
                
                
            </Paper>
        </div>
    );
}

export default TinyGameCard;