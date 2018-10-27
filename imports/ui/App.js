import React, { Component } from 'react';
import HomePage from './Shared/Home/HomePage.js';
import RegisterPage from './Shared/Register/RegisterPage.js';
import LoginPage from './Shared/Login/LoginPage.js';
import { Route,Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
