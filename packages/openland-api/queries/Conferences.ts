import gql from 'graphql-tag';
import { ConferenceFull } from 'openland-api/fragments/ConferenceFull';
import { UserShort } from 'openland-api/fragments/UserShort';

export const ConferenceQuery = gql`
    query Conference($id: ID!) {
        conference(id: $id) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;