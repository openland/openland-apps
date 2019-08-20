import gql from 'graphql-tag';

export const PersistEventsMutation = gql`
    mutation PersistEvents($did: String!, $events: [Event!]!, $isProd: Boolean) {
        track(did: $did, events: $events, isProd: $isProd)
    }
`;