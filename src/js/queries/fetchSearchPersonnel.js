import gql from 'graphql-tag';

export default gql`
  query PersonnelSearchQuery($filter: String!) {
    personnel(filter: $filter) {
      firstName
      lastName  
      nssfId
      nhifId
      idNumber
      phoneNumber
      gender
      location
      addressNo
      photoUrl
      highestEducationLevel
      certificatesUrl
      curriculumVitaeUrl
      designation
      dateOfEmployment
      dateOfTermination
      currentSalary
    }
  }
`;