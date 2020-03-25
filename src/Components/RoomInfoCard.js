import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'



const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));


export default function RoomInfoCard(props){


    const classes = useStyles();


    return(
        <Paper>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    style={{ height: 0, paddingTop: '56.25%' }}
                    image={props.boardgame && props.boardgame.image_url}
                    title={props.name}
                />
                <CardContent>
                    <Grid container>
                        <Grid item md={6}>
                            <Typography variant={"body1"}>Name: {props.name}</Typography>
                            <Typography variant={"body1"}>Max Players: {props.maxplayers}</Typography>
                            <Typography variant={"body1"}>Current Players: {props.users && props.users.length} </Typography>
                        </Grid>
                        <Grid item md={6} style={{textAlign: "right"}}>
                            {props.userInGame() && <Button variant='outlined' color='secondary'onClick={props.leaveGame}>Leave Game</Button>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Paper>
    )
}