import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtSDecode from 'jwt-decode';
import axios from 'axios';

//redux 
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUser } from './redux/actions/userActions';

//components
import NavBar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

//pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createMuiTheme';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtSDecode(token);
  if (decodedToken.exp * 1000 > Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login'

  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUser());
  }
}


const theme = createTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    },
  },
  typography: {
    useNextVariants: true
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/signup' component={Signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider >
  );
}

export default App;
