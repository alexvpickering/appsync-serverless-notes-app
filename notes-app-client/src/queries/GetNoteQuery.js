import gql from "graphql-tag";

export default gql`
  query GetNoteQuery($id: ID!, $skip: Boolean!) {
    note(id: $id) @skip(if: $skip) {
      id
      meta
      content
    }
  }
`;
