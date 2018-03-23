import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { graphql } from "react-apollo";
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

Auth.signIn(cognitoOutputs.TestUserEmail, cognitoOutputs.TestUserPassword)
  .then(user => console.log(user))
  .catch(err => console.log(err));

class App extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log({ nextProps });
    console.log({ nextState });
  }
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
        <div>id: {this.props.id}</div>
        <div>meta: {this.props.meta}</div>
        <div>content: {this.props.content}</div>
      </div>
    );
  }
}

const mapPropsToOptions = () => {
  return {
    variables: {
      id: "1234"
    }
  };
};

const mapResultsToProps = ({ data }) => {
  console.log("mapResultsToProps");
  return {
    id: data.getNote.id,
    meta: data.getNote.meta,
    content: data.getNote.content
  };
};

export default graphql(GetNoteQuery, {
  props: mapResultsToProps,
  options: mapPropsToOptions
})(App);
