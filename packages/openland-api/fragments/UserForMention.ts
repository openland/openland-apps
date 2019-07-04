import gql from 'graphql-tag';
import { UserBadge } from './UserBadge';

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
