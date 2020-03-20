import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TinyGameCard from '../Components/TinyGameCard'



export default function ChosenGames(props) {


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
            })
        })

    }
    
    return (
        <div>
            <Grid style={{ height: 100, overflow: "scroll", padding: 2}}>
                {renderTinyCards()}
            </Grid>
            <Button variant="contained" color="primary" onClick={addChosenGamesToDatabase}>Add Games to Collection</Button>
        </div>
    );
}
