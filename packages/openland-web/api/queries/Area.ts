import gql from 'graphql-tag';
import { UserShort } from './User';

export const AreaShort = gql`
    fragment AreaShort on Area {
        id
        slug
        writeAccess
    }
`;

export const AreaQuery = gql`
    query Area($areaId: String!) {
        area(slug: $areaId) { ...AreaShort }
        me { ...UserShort }
    }
    ${UserShort}
    ${AreaShort}
`;