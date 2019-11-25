import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Axios from 'axios';

import Tweet from '../components/Tweet';
import Profile from '../components/Profile';


export default class Home extends Component {
    state = {
        tweets: null
    }

    componentDidMount() {
        Axios.get('/tweets')
            .then(res => {
                console.log(res.data)
                this.setState({
                    tweets: res.data
                })
            })
            .catch(err => console.log(err));
    }
    render() {

        let recentTweets = this.state.tweets ? (
            this.state.tweets.map((tweet) => <Tweet key={tweet.tweetId} tweet={tweet} />)) : (<p>loading tweets..</p>)

        return (
            <Grid container spacing={5}>
                <Grid item sm={7} xs={10}>
                    {
                        recentTweets
                    }
                </Grid>
                <Grid item sm={5} xs={10}>
                    <Profile />
                </Grid>

            </Grid >
        )
    }
}
