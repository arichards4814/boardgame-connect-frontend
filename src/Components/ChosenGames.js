import React from 'react'
import Button from '@material-ui/core/Button';
import TinyGameCard from '../Components/TinyGameCard'


export default function ChosenGames(props) {


    const renderTinyCards = () => {
        let chosenGames = props.games.filter(game => game.chosen === true)
        return chosenGames.map(game => <TinyGameCard {...game}/>)
    }
    
    return (
        <div>
            {renderTinyCards()}
            <Button variant="contained" color="primary" onClick={props.handleSubmit}>Add Games to Collection</Button>
        </div>
    );
}
