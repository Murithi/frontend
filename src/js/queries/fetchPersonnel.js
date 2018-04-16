import gql from 'graphql-tag';

export default gql`
  query PersonnelFeed {
    personnelFeed {
      id
      firstName
      lastName
      idNumber
    }
  }
`;
