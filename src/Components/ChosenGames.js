import React from 'react'
import Button from '@material-ui/core/Button';


export default function ChosenGames(props) {

    return (
        <div>
            <Button variant="contained" color="primary" onClick={props.handleSubmit}>Add Games to Collection</Button>
        </div>
    );
}
