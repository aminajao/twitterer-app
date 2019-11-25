import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//material-ui-imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import PostTweet from './PostTweet';

import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

class NavBar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ? (
                        <Fragment>
                            <Link to='/' >
                                <Tooltip title='Go back to homepage'>
                                    <IconButton >
                                        <HomeIcon color='primary' />
                                    </IconButton>
                                </Tooltip>
                            </Link>

                            <Tooltip title='Notification' placement='top'>
                                <IconButton >
                                    <NotificationIcon color='primary' />
                                </IconButton>
                            </Tooltip>

                            <PostTweet />
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to='/'>Home</Button>
                                <Button color="inherit" component={Link} to='/login' >Login</Button>
                                <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                            </Fragment>
                        )
                    }
                </Toolbar>
            </AppBar >
        )
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NavBar);