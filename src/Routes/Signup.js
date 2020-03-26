import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import GoogleLoginButton from '../Components/GoogleLogin'



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Signup(props){
    
    const classes = useStyles(); 
    const [form, setState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        zoom_id: "",
        image_url: ""

    });
    const [errors, setError] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (form.password === form.confirmPassword){
            console.log("submit pressed")
            fetch('http://localhost:3000/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: form.username,
                    password: form.password,    
                    zoom_id: form.zoom_id,
                    img_url: form.img_url
                })
            })
            .then(res=> res.json())
            .then(response => {
                if(response.errors){
                    console.log(errors)
                    setError(response)
                } else {
                    props.setUser(response)
                    props.history.push("/addgames")
                }
            })
        } else {
            setError({errors: ["Passwords are not the same"]})
        }
    }

    const handleChange = (e) => {
        setState({
            ...form,
            [e.target.name]: e.target.value
        });
    }


    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" >
                <Paper style={{ marginTop: 20}}>
                    <Typography component="div" style={{ margin: 10, height: '90vh', textAlign: "center"}}>
                        <div style={{textAlign: "center"}}>
                            <img src={"./images/Logo_BW.png"} className="main-logo" />
                        </div>
                        <Typography variant="h4" component="h2">
                            Welcome to the Board Room
                        </Typography>
                        <Typography variant="h5" component="h2">
                            First, let's set up your account:
                        </Typography>
                        <Typography variant="h6" component="h2">
                            Or login with Google or Facebook
                        </Typography>
                        {/* <GoogleLoginButton /> */}
                        <Button onClick={() => props.history.push("/login")} variant="contained" color="default" style={{ margin: 5}}>Login</Button> 
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField fullWidth margin="dense" required onChange={handleChange} label="Username" name="username"/>
                            <TextField fullWidth margin="dense" required onChange={handleChange} label="Email Address" name="email"/>
                            <TextField fullWidth margin="dense" required onChange={handleChange} label="Zoom ID" name="zoom_id"/>
                            <TextField fullWidth margin="dense" required onChange={handleChange} label="Image URL" name="img_url"/>
                            <TextField fullWidth margin="dense" required onChange={handleChange} label="Password" name="password"/>
                            <TextField fullWidth margin="dense" required onChange={handleChange} label="Confirm Password" name="confirmPassword"/>
                            <Button variant="contained" color="primary" type="submit" style={{ margin: 10 }}> Submit </Button>
                        </form>
                    </Typography>
                    {errors ? <Typography>{errors.errors}</Typography> : ""}
                </Paper>
            </Container>
        </React.Fragment>
    )
}
