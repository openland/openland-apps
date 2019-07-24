import gql from 'graphql-tag';

export const UserForMention = gql`
    fragment UserForMention on User {
        isYou
        id
        name
        photo
        primaryOrganization {
            id
            name
        }
    }
`;
