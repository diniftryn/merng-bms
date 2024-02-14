import { gql } from "@apollo/client";

const GET_INSTRUCTORS = gql`
  query getInstructors {
    instructors {
      id
      name
      email
      phone
    }
  }
`;

export { GET_INSTRUCTORS };
