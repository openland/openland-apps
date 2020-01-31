import gql from 'graphql-tag';
import { UserNano } from '../fragments/UserNano';

export const ResolveShortNameQuery = gql`
    query ResolveShortName($shortname: String!) {
        item: alphaResolveShortName(shortname: $shortname) {
            ... on User {
                id
                isDeleted                
            }
            ... on Organization {
                id
                isDeleted                
            }
            ... on FeedChannel {
                id
            }
        }
    }
`;

export const GetUserQuery = gql`
    query GetUser($id: ID!) {
        user: user(id: $id) {
            ...UserNano
        }
    }
    ${UserNano}
`;

export const SetOrgShortnameMutation = gql`
    mutation SetOrgShortname($organizationId: ID!, $shortname: String!) {
        alphaSetOrgShortName(id: $organizationId, shortname: $shortname)
    }
`;

export const SetUserShortnameMutation = gql`
    mutation SetUserShortname($shortname: String!) {
        alphaSetUserShortName(shortname: $shortname)
    }
`;

export const SetFeedChannelShortnameMutation = gql`
    mutation SetFeedChannelShortname($id: ID!, $shortname: String!) {
        alphaSetFeedChannelShortName(id: $id, shortname: $shortname)
    }
`;