import gql from 'graphql-tag';

export const StateQuery = gql`
    query StateQuery {
        items: states(active: true) {
            id
            title: name
            subtitle: code
        }
    }
`;

export const CountyQuery = gql`
    query CountyQuery($stateId: ID!) {
        items: counties(stateId: $stateId) {
            id
            title: name
        }
    }
`;