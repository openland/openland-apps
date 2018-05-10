import gql from 'graphql-tag';

export const ProjectPreview = gql`
    fragment ProjectPreview on BuildingProject {
        id
        slug
        name
        approvalTime
        preview: picture(width: 310, height: 181) {
            url
            retina
        }
    }
`;