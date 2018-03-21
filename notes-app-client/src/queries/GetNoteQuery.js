import gql from "graphql-tag";

export default gql`
  query GetNoteQuery {
    getNote(id: "1234") {
      id
      meta
      content
    }
  }
`;
