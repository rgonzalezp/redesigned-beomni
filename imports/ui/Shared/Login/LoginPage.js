import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import Navigation from '../Home/PrimarySearchBar.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#4851A9',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#F6F2E3',
      main: '#FFFEFA',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    
  }

  async checkAuthentication() {
  	//here check authentication with jwt

    
  }

  componentDidUpdate() {

  }

  render() {
    if (this.state.authenticated === null) return <MuiThemeProvider theme={theme}><CircularProgress className="centered" size={80} color="primary"></CircularProgress></MuiThemeProvider>;
    return this.state.authenticated ?
      <Redirect to={{ pathname: '/' }} /> :
      <div>
      <Navigation/>
      <LoginForm baseUrl={this.props.baseUrl} />
      </div>;
      
  }
};
