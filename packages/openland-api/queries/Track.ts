import gql from 'graphql-tag';

export const PersistEventsMutation = gql`
    mutation PersistEvents($did: String!, $events: [Event!]!) {
        track(did: $did, events: $events)
    }
`;