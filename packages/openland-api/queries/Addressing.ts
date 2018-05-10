import gql from 'graphql-tag';

export const StateQuery = gql`
    query State {
        items: states(active: true) {
            id
            title: name
            subtitle: code
        }
    }
`;

export const CountyQuery = gql`
    query County($stateId: ID!) {
        items: counties(stateId: $stateId) {
            id
            title: name
        }
    }
`;