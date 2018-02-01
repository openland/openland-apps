import gql from 'graphql-tag';
import { UserShort } from './User';

export const AreaQuery = gql`
    query Area($areaId: String!) {
        area(slug: $areaId) {
            id
            slug
        }
        me {
            ...UserShort
        }
    }
    ${UserShort}
`;