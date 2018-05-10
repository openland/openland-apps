import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { AreaShort } from '../fragments/AreaShort';

export const AreaQuery = gql`
    query Area($areaId: String!) {
        area(slug: $areaId) { ...AreaShort }
        me { ...UserShort }
    }
    ${UserShort}
    ${AreaShort}
`;