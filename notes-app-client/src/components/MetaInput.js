import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withHandlers, withStateHandlers, compose } from "recompose";
import PropTypes from "prop-types";

//== MetaInput

const MetaInput = ({ setMeta, meta, updateNote }) => {
  return (
    <div>
      <h2>Update the Note's Meta Field</h2>
      <form>
        <input type="text" onChange={setMeta} value={meta} />
        <button onClick={updateNote}>Update Note</button>
      </form>
    </div>
  );
};

MetaInput.propTypes = {
  setMeta: PropTypes.func.isRequired,
  meta: PropTypes.string.isRequired,
  updateNote: PropTypes.func.isRequired
};

const mutation = gql`
  mutation UpdateMetaMutation($id: ID!, $meta: String!) {
    updateNote(input: { id: $id, meta: $meta }) {
      id
      meta
    }
  }
`;

export default compose(
  graphql(mutation),

  withStateHandlers(
    { meta: "" },
    {
      setMeta: () => event => ({ meta: event.target.value }),
      clearMeta: () => () => ({ meta: "" })
    }
  ),

  withHandlers({
    updateNote: ({ noteId, meta, mutate, clearMeta }) => event => {
      event.preventDefault();

      noteId &&
        mutate({
          variables: { id: noteId, meta: meta },
          optimisticResponse: {
            updateNote: {
              id: noteId, // real id for offline query updates
              meta: meta,
              __typename: "Note"
            }
          }
        }).then(clearMeta());
    }
  })
)(MetaInput);
