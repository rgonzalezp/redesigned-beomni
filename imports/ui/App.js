import React, { Component } from 'react';
import Hello from './Hello.js';
import Info from './Info.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';



class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Meteor!</h1>
        <AccountsUIWrapper/>
        <Hello />
        <Info />
      </div>
    );
  }
}

export default App;
