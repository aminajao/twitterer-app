import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import AppIcon from '../images/twitter-login.png';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux shit
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px auto 20px auto',
    },
    textField: {
        margin: '10px auto 10px auto',
    },
    button: {
        marginTop: 20,
        position: 'relative',
        marginBottom: 20
    },
    customError: {
        color: 'red',
        fontSize: '1rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
}



class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            userHandle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            userHandle: this.state.userHandle,
        }
        this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }



    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    {/* <img src={AppIcon} alt='image'></img> */}
                    <Typography variant='h3' className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            required
                            id='email'
                            onChange={this.handleChange}
                            name='email' label='email'
                            type='email'
                            className={classes.textField}
                            value={this.state.email} fullWidth
                            helperText={errors.email}
                            error={errors.email ? true : false}
                        />
                        <TextField
                            required
                            id='password'
                            onChange={this.handleChange}
                            name='password'
                            label='password'
                            type='password'
                            className={classes.textField}
                            value={this.state.password} fullWidth
                            helperText={errors.password}
                            error={errors.password ? true : false}
                        />
                        <TextField
                            required
                            id='confirmPassword'
                            onChange={this.handleChange}
                            name='confirmPassword' label='Confirm Password'
                            type='password'
                            className={classes.textField}
                            value={this.state.confirmPassword} fullWidth
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                        />
                        <TextField
                            required
                            id='handle'
                            onChange={this.handleChange}
                            name='userHandle' label='handle'
                            type='text'
                            className={classes.textField}
                            value={this.state.userHandle} fullWidth
                            helperText={errors.userHandle}
                            error={errors.userHandle ? true : false}
                        />
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type='submit' disabled={loading} variant='contained' color='primary' className={classes.button} >
                            Signup
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>Already have an account ? Login <Link to='/login'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup))