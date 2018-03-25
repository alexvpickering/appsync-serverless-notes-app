import React from "react";
import { Auth } from "aws-amplify";
import {
  withState,
  pure,
  compose,
  lifecycle,
  withStateHandlers
} from "recompose";

import Data from "./Data";
import logo from "../logo.svg";
import "../App.css";
import NoteSelector from "./NoteSelector";
import MetaInput from "./MetaInput";
import PropTypes from "prop-types";
import cognitoOutputs from "../outputs/cognito";

const App = ({ setNoteId, noteId, auth }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        Select a Note to retrieve dynamodb/s3 graphql query.
      </p>
      <NoteSelector setNoteId={setNoteId} />

      <MetaInput noteId={noteId} />
      <Data noteId={noteId} auth={auth} />
    </div>
  );
};

App.propTypes = {
  setNoteId: PropTypes.func.isRequired,
  noteId: PropTypes.string.isRequired,
  auth: PropTypes.bool.isRequired
};

export default compose(
  withState("auth", "setAuth", false),

  withStateHandlers(
    { noteId: "" },
    { setNoteId: () => event => ({ noteId: event.target.value }) }
  ),

  lifecycle({
    componentDidMount() {
      Auth.signIn(cognitoOutputs.TestUserEmail, cognitoOutputs.TestUserPassword)
        .then(this.props.setAuth(true))
        .catch(error => console.error(error));
    }
  }),
  pure
)(App);
