import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Login(props) {

    const classes = useStyles();
    const [form, setState] = useState({
        name: "",
        password: ""
    });


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(response => {
                //set user to state
                //redirect
                if(response.errors){
                    alert(response.errors)
                } else{
                    props.setUser(response)
                    props.history.push("/")
                }
            })
    }

    const handleChange = (e) => {
        setState({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" >
                <Paper style={{ marginTop: 20 }}>
                    <Typography component="div" style={{ margin: 10, height: '70vh', textAlign: "center" }}>

                        <div style={{ textAlign: "center" }}>
                            <img src={"./images/Logo_BW.png"} className="main-logo" />
                        </div>
                        <h1>Welcome to Boardgame Connect</h1>
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField fullWidth margin="dense" required onChange={handleChange} label="Username" name="name" />
                            <TextField fullWidth margin="dense" required onChange={handleChange} type="password" label="Password" name="password" type="password"/>
                            <Button variant="contained" color="primary" type="submit" style={{ margin: 10}}> Login </Button>
                        </form>
                        <Typography variant="subtitle1" component="h2">
                            Don't have an account? <Link onClick={() => props.history.push("/signup")}>Sign Up</Link>
                        </Typography>
                    </Typography>
                </Paper>
            </Container>
        </React.Fragment>
    )
}
