import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

//redux shit
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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



class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
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
                        Login
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            required
                            id='email'
                            onChange={this.handleChange}
                            name='email' label='email'
                            className={classes.textField}
                            value={this.state.email} fullWidth
                            helperText={errors.email}
                            error={errors.email ? true : false}
                        />
                        <TextField
                            required
                            type='password'
                            id='password'
                            onChange={this.handleChange}
                            name='password'
                            label='password'
                            className={classes.textField}
                            value={this.state.password} fullWidth
                            helperText={errors.password}
                            error={errors.password ? true : false}
                        />
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type='submit' disabled={loading} variant='contained' color='primary' className={classes.button} >
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>Dont have an account ? sign up <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});
const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));