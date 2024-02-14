import { gql } from "@apollo/client";

const ADD_INSTRUCTOR = gql`
  mutation addInstructor($name: String!, $email: String!, $phone: String!) {
    addInstructor(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_INSTRUCTOR = gql`
  mutation deleteInstructor($id: ID!) {
    deleteInstructor(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { ADD_INSTRUCTOR, DELETE_INSTRUCTOR };
