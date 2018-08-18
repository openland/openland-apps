import gql from 'graphql-tag';
import { OrganizationShort } from '../fragments/OrganizationShort';

export const UsersQuery = gql`
    query Users($query: String!) {
        items: users(query: $query) {
            id
            title: name
            subtitle: email
        }
    }
`;

export const UserQuery = gql`
    query User($userId: ID!) {
        user: user(id: $userId) {
            id
            name
            firstName
            lastName
            photo
            phone
            email
            website
            about
            location
            isBot
            primaryOrganization: alphaPrimaryOrganization{
                ...OrganizationShort
            }
        }
    }
    ${OrganizationShort}
`;