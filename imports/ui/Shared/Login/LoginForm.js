import React from 'react';
import {Container, 
  Col, 
  Form,
  FormGroup, 
  Label, 
  Input,
  FormText
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import  { Meteor }  from 'meteor/meteor';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './LoginForm.css';
import { withRouter } from 'react-router-dom';


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


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: localStorage.getItem('sessionToken'),
      error: null,
      username: '',
      password: ''
    };

    if (this.state.sessionToken) {
      this.props.history.push('/results');
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit() {
  //call meteor
  let este = this;
    Meteor.call(
      'users.validateUser',
      {
        email: this.state.username,
        password: this.state.password
      },
      (err, res) => {
        if (err) 
          alert(err.error);
       
          localStorage.setItem('sessionToken', res);
          localStorage.setItem('correo', this.state.username);
          localStorage.setItem('filter','')
          este.props.history.push('/results');
        
      }
    );
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {

    return (
      <Container className="App contained">
        <h1>Sign In</h1>
        <Form className="form" onSubmit={this.handleSubmit}>
          <Col>
            <FormGroup>
              <Label id="usernameLabel" >Username</Label>
              <Input
                id="username"
                aria-label="Input your username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label id="passwordLabel" for="examplePassword">Password</Label>
              <Input
                id="password"
                aria-label="Input your password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </FormGroup>
          </Col>
          <Button onClick={this.handleSubmit.bind(this)} className="login-buttons"  variant="contained" color="primary" size="large">Let's go</Button>
        </Form>
      </Container>
    );
  }
}
export default withRouter(LoginForm);