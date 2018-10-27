import React from 'react';
import {Container, 
  Col, 
  Form,
  FormGroup, 
  Label, 
  Input,
  Button,
  FormText
} from 'reactstrap';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './LoginForm.css';

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
      sessionToken: null,
      error: null,
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
   //call meteor
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {

    return (
      <Container className="App">
        <h2>Sign In</h2>
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
          <Button className="login-buttons"  block>Let's go</Button>
        </Form>
      </Container>
    );
  }
}
export default LoginForm;