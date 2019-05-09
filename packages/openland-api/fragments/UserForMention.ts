import gql from 'graphql-tag';

export const UserForMention = gql`
    fragment UserForMention on User {
        id
        name
        photo
        primaryOrganization {
            id
            name
        }
    }
`;
