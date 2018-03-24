import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import Amplify, { Auth } from "aws-amplify";
import Data from "./Data";
import cognitoOutputs from "../outputs/cognito";
import { graphql } from "react-apollo";
import UpdateNoteMutation from "../queries/UpdateNoteMutation";

Amplify.configure({
  Auth: {
    userPoolId: cognitoOutputs.UserPoolId,
    userPoolWebClientId: cognitoOutputs.UserPoolClientId
  }
});

class App extends Component {
  state = {
    noteId: "",
    meta: "",
    auth: false
  };

  componentDidMount() {
    Auth.signIn(cognitoOutputs.TestUserEmail, cognitoOutputs.TestUserPassword)
      .then(user => this.setState({ auth: true }))
      .catch(err => console.log(err));
  }

  handleSubmit = event => {
    event.preventDefault();

    this.state.noteId &&
      this.props
        .mutate({
          variables: { id: this.state.noteId, meta: this.state.meta },
          optimisticResponse: {
            updateNote: {
              id: this.state.noteId, // real id for offline query updates
              meta: this.state.meta,
              __typename: "Note"
            }
          }
        })
        .then(res => {
          this.setState({ meta: "" });
        });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Select a Note to retrieve dynamodb/s3 graphql query.
        </p>

        <h2>Select a Note</h2>
        <select onChange={e => this.setState({ noteId: e.target.value })}>
          <option value="" />
          <option value="1">Note 1</option>
          <option value="2">Note 2</option>
          <option value="3">Note 3</option>
          <option value="4">Note 4</option>
          <option value="5">Note 5</option>
        </select>
        <h2>Update the Note's Meta Field</h2>
        <form>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.meta}
            name="meta"
          />
          <button onClick={this.handleSubmit}>Update Note</button>
        </form>
        <Data noteId={this.state.noteId} auth={this.state.auth} />
      </div>
    );
  }
}

export default graphql(UpdateNoteMutation)(App);
