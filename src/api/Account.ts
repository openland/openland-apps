import gql from 'graphql-tag';
import { graphqlRouted } from '../utils/graphqlRouted';
import { User } from './User';

export interface Account {
    id: string;
    name: string;
    city?: string;
    readAccess: Boolean;
    writeAccess: Boolean;
    generation: number;
}

export interface AccountResponse {
    account: Account;
    me?: User;
}

// Queries

const QueryCity = gql`
    query {
        account {
            id
            name
            city
            readAccess
            writeAccess
            generation
        }
        me {
            id
            name
            firstName
            lastName
            picture
        }
    }
`;

export const withAccountQuery = graphqlRouted<AccountResponse>(QueryCity, []);