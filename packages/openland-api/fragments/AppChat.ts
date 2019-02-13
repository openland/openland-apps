import gql from 'graphql-tag';

export const AppChat = gql`
    fragment AppChat on AppChat {
        chat {
            ... on PrivateRoom {
                id
            }
            ... on SharedRoom {
                id
            }
        }
        webhook
    }
`;
