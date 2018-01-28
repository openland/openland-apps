import gql from 'graphql-tag';
import { graphqlRouted } from '../utils/graphqlRouted';
import { Account } from './Account';
import { User } from './User';

interface Area {
    id: string;
    slug: string;
}

const QueryArea = gql`
    query area($areaId: String!) {
        area(slug: $areaId) {
            id
            slug
        }
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

export const withAreaQuery = graphqlRouted<{ area: Area, account: Account, me?: User }>(QueryArea, []);