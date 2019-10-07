import gql from 'graphql-tag';

export const ResolveShortNameQuery = gql`
    query ResolveShortName($shortname: String!) {
        item: alphaResolveShortName(shortname: $shortname) {
            ... on User {
                id
            }
            ... on Organization {
                id
            }
            ... on FeedChannel {
                id
            }
        }
    }
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