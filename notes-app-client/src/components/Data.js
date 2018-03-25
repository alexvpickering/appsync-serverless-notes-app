import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";

const Data = ({ data }) => {
  return (
    <div>
      <h2>Data</h2>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(data.note, undefined, 2)}
      </pre>
    </div>
  );
};

Data.propTypes = {
  noteId: PropTypes.string
};

const query = gql`
  query GetNoteQuery($id: ID!, $skip: Boolean!) {
    note(id: $id) @skip(if: $skip) {
      id
      meta
      content
    }
  }
`;

export default graphql(query, {
  options: props => {
    return {
      variables: {
        id: props.noteId && props.noteId,
        skip: !props.noteId || !props.auth
      },
      fetchPolicy: "cache-and-network"
    };
  }
})(Data);
