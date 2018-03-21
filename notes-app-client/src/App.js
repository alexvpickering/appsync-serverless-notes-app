import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { graphql, ApolloProvider, compose } from "react-apollo";
import * as AWS from "aws-sdk";
import AppSync from "./appsync.js";
import GetNoteQuery from "./queries/GetNoteQuery";
import Amplify, { Auth } from "aws-amplify";

import cognitoOutputs from "./outputs/cognito";

console.log(cognitoOutputs);

Amplify.configure({
  Auth: {
    userPoolId: cognitoOutputs.UserPoolId,
    userPoolWebClientId: cognitoOutputs.UserPoolClientId
  }
});

Auth.signIn("alexvpickering@gmail.com", "Passw0rd!")
  .then(user => console.log(user))
  .catch(err => console.log(err));

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    // Amazon Cognito user pools using AWS Amplify
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

class App extends Component {
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
      </div>
    );
  }
}

export default App;
