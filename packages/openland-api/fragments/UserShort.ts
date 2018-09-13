import gql from 'graphql-tag';
export const UserShort = gql`
    fragment UserShort on User {
        id
        name
        firstName
        lastName
        picture
        email
        primaryOrganization: alphaPrimaryOrganization {
            id
            name
            photo
        }
        role: alphaRole
        linkedin: alphaLinkedin
        twitter: alphaTwitter
    }
`;