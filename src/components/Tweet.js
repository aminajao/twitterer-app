import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//material ui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        minHeight: 270,

    },
    image: {
        minWidth: 100,
        maxHeight: 100,
        marginTop: 40,
        marginRight: 30,
        marginLeft: 30,
        borderRadius: '50%',
        border: 1
    },
    content: {
        padding: '25',
        marginTop: 50,

    },
    tweet: {
        marginTop: 40,

    }
}

class Tweet extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, tweet: { body, createdAt, userImage, userHandle, likeCount, commentCount } } = this.props
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant='h5' color='primary' component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography className={classes.tweet} variant='body1'>{body}</Typography>
                </CardContent>
            </Card >
        )
    }
}


export default withStyles(styles)(Tweet);