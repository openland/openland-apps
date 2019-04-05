import gql from 'graphql-tag';

export const PersistEventsMutation = gql`
    mutation PersistEvents($did: String!, $events: [Event!]!, $platform: EventPlatform, $isProd: Boolean) {
        track(did: $did, events: $events, platform: $platform, isProd: $isProd)
    }
`;