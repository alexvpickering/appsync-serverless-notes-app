import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import Amplify, { Auth } from "aws-amplify";
import Data from "./Data";

import cognitoOutputs from "../outputs/cognito";

Amplify.configure({
  Auth: {
    userPoolId: cognitoOutputs.UserPoolId,
    userPoolWebClientId: cognitoOutputs.UserPoolClientId
  }
});

Auth.signIn(cognitoOutputs.TestUserEmail, cognitoOutputs.TestUserPassword)
  .then(user => console.log(user))
  .catch(err => console.log(err));

class App extends Component {
  state = {
    noteId: ""
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <select onChange={e => this.setState({ noteId: e.target.value })}>
          <option value="" />
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <Data noteId={this.state.noteId} />
      </div>
    );
  }
}

export default App;
