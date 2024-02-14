import { gql } from "@apollo/client";

const ADD_CLASS = gql`
  mutation AddClass($name: String!, $description: String!, $status: ClassStatus!, $instructorId: ID!) {
    addClass(name: $name, description: $description, status: $status, instructorId: $instructorId) {
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

const DELETE_CLASS = gql`
  mutation DeleteClass($id: ID!) {
    deleteClass(id: $id) {
      id
    }
  }
`;

const UPDATE_CLASS = gql`
  mutation UpdateClass($id: ID!, $name: String!, $description: String!, $status: ClassStatusUpdate!) {
    updateClass(id: $id, name: $name, description: $description, status: $status) {
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

export { ADD_CLASS, DELETE_CLASS, UPDATE_CLASS };
