import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TinyGameCard from '../Components/TinyGameCard'



export default function ChosenGames(props) {


    const renderTinyCards = () => {
        let chosenGames = props.games.filter(game => game.chosen === true)
        return chosenGames.map(game => <TinyGameCard {...game}/>)
    }
    
    return (
        <div>
            <Grid style={{ height: 100, overflow: "scroll", padding: 2}}>
                {renderTinyCards()}
            </Grid>
            <Button variant="contained" color="primary" onClick={props.handleSubmit}>Add Games to Collection</Button>
        </div>
    );
}
