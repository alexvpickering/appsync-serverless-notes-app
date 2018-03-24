import gql from "graphql-tag";

export default gql`
  mutation UpdateNoteQuery($id: ID!, $meta: String!) {
    updateNote(input: { id: $id, meta: $meta }) {
      id
      meta
    }
  }
`;
