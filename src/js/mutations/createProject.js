import gql from 'graphql-tag';

export default gql`
mutation createProject(
    $projectName: String!,
    $projectDescription: String!,
    $projectValuation: Int!,
    $projectStartDate: DateTime!,
    $projectCompletionDate: DateTime!,
    $projectLocation: String!

    ){
        addRole(
            projectName:$projectName,
            projectDescription:$projectDescription,
            projectValuation:$projectValuation,
            projectStartDate:$projectStartDate,
            projectCompletionDate:$projectCompletionDate,
            projectLocation:$projectLocation
        ){
            id
            projectName
            projectDescription
   
        }
    }
`;