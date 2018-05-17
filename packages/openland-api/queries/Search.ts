import gql from 'graphql-tag';

export const SearchQuery = gql`
    query Search($query: String!) {
        search(query: $query) {
            parcels {
                edges {
                    node {
                        id
                        title
                        extrasArea
                        extrasNeighborhood
                        metadata {
                            available
                            currentUse
                        }
                    }
                    score
                    highlight {
                        key
                        match
                    }
                }
                total
            }
            folders {
                edges {
                    node {
                        id
                        name
                    }
                    score
                    highlight {
                        key
                        match
                    }
                }
                total
            }
        }
    }
`;