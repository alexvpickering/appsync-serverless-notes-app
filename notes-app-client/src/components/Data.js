import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import GetNoteQuery from "../queries/GetNoteQuery";
import { Auth } from "aws-amplify";

const Data = ({ data }) => {
  return (
    <div>
      <h2>Data</h2>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </div>
  );
};

Data.propTypes = {
  noteId: PropTypes.string
};

export default graphql(GetNoteQuery, {
  options: props => {
    return {
      variables: {
        id: props.noteId && props.noteId,
        skip: !props.noteId || !props.auth
      }
    };
  }
})(Data);
