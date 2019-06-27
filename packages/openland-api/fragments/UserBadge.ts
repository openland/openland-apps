import gql from 'graphql-tag';

export const UserBadge = gql`
    fragment UserBadge on UserBadge {
        id
        name
        verified
    }
`;
