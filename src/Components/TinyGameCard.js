import React from 'react';
import GamesContainer from '../Containers/GamesContainer';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'

function TinyGameCard(props) {
    return (
        <div>
            <Paper>
                <Typography variant="body2">{props.name} {props.year_published}</Typography>
            </Paper>
        </div>
    );
}

export default TinyGameCard;