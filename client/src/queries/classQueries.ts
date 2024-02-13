import { gql } from "@apollo/client";

const GET_CLASSES = gql`
  query getClasses {
    classes {
      id
      name
      status
    }
  }
`;

const GET_CLASS = gql`
  query getClass($id: ID!) {
    class(id: $id) {
      id
      name
      description
      status
      instructor {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_CLASSES, GET_CLASS };
