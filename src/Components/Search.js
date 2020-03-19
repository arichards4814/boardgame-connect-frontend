import React from 'react'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


export default function Search(props) {

    return (
        <div>
            <Input onChange={props.handleChange} value={props.search} />
            <Button variant="contained" color="primary" onClick={props.handleSubmit}>Search</Button>
        </div>
    );
}
