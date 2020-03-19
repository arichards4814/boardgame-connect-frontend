import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function GameCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [hearted, setHearted] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { id, images, name, description, description_preview, image_url, year_published } = props
    console.log(props)

    let tinyDescription = description_preview.slice(0, 150)
    tinyDescription = `${tinyDescription}...`
    let firstLetter = name.slice(0, 1)

    const heartHandler = (id) => {
        setHearted(!hearted)
        props.addToChosen(id)
        //pass in the id here and have it run a function one level up
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {firstLetter}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name}
                subheader={year_published}
            />
            <CardMedia
                className={classes.media}
                style={{ height: 0, paddingTop: '56.25%' }}
                image={image_url}
                title={name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {tinyDescription}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    {hearted ? <FavoriteIcon onClick={() => heartHandler(id)} /> : <FavoriteBorder onClick={() => heartHandler(id)} />}
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {description_preview}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}