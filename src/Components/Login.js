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

export default function Signup(props) {

    const classes = useStyles();
    const [form, setState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit pressed")
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
                    <Typography component="div" style={{ margin: 10, height: '60vh', textAlign: "center" }}>

                        <div style={{ textAlign: "center" }}>
                            <img src={"./images/Logo_BW.png"} className="main-logo" />
                        </div>
                        <Typography variant="h4" component="h2">
                            Welcome to the Board Room
                        </Typography>
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField fullWidth margin="dense" required onChange={handleChange} label="Username" name="username" />
                            <TextField fullWidth margin="dense" required onChange={handleChange} label="Password" name="password" />
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
