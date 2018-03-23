import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import GetNoteQuery from "../queries/GetNoteQuery";

const Data = ({ data }) => {
  console.log(data);
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
  options(ownProps) {
    return {
      variables: {
        id: ownProps.noteId && ownProps.noteId
      }
    };
  },
  skip: ({ noteId }) => noteId === ""
})(Data);
