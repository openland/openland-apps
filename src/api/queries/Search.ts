import gql from 'graphql-tag';

export const SearchQuery = gql`
    query Search($query: String!) {
        search(query: $query) {
            parcels {
                edges {
                    node {
                        id
                        title
                    }
                }
                total
            }
        }
    }
`;