import gql from 'graphql-tag';

export default gql`
    query SectionFeed{
        sectionFeed{
            sectionName,
                    sectionDescription,                    
                    sectionStartDate,
                    sectionEndDate,
                    sectionLocation,
                    sectionProject {
                        projectName
                    },
        }
    }
`;