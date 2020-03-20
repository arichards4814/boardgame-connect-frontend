import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function NavFloat(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Tooltip title="Home" aria-label="home">
                <Fab size="small" color="primary" aria-label="add" onClick={props.goHome}>
                    <HomeIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Host a Game" aria-label="host">
                <Fab size="small" color="secondary" aria-label="host" >
                    <AccessibilityNewIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Check Out Rooms" aria-label="rooms">
                <Fab variant="extended" onClick={props.goToRooms}>
                    <DashboardIcon className={classes.extendedIcon} />
                    Rooms
                </Fab>
            </Tooltip>
        </div>
    );
}