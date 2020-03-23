import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';


    const useStyles = makeStyles(theme => ({
        root: {
        flexGrow: 1,
        },
        menuButton: {
        marginRight: theme.spacing(2),
        },
        title: {
        flexGrow: 1,
        },
    }));

    const MilesNav = (props) => {
        const classes = useStyles();
        return(
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" className={classes.title}>
                BoardGame Connect (Maybe make this text the logo image? )
            </Typography>
            <Button color="inherit" onClick={() => props.history.push("/")}> < HomeIcon /> </Button>
            </Toolbar>
        </AppBar>
        )
    }

export default MilesNav