import gql from "graphql-tag";

export default gql`
  query GetNoteQuery($id: ID!) {
    note(id: $id) {
      id
      meta
      content
    }
  }
`;
