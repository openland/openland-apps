import { gql } from 'react-apollo';
import graphqlList from './graphqlList';

export interface Permit {
    id?: string;
    issuedAt?: string;
    createdAt?: string;
    status?: string;
}

const PermitsQuery = gql`
query Permits($cursor: String, $filter: String) {
    items: permits(filter: $filter, first: 50, after: $cursor) {
        edges {
            node {
                id
                issuedAt
                createdAt
                status
            }
            cursor
        }
        pageInfo {
            hasNextPage
            hasPreviousPage
        }
    }
}
`;

export const withPermitsQuery = graphqlList<Permit, { filter?: string }>(PermitsQuery);