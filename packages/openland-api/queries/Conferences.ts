import gql from 'graphql-tag';

export const ConferenceQuery = gql`
    query Conference($id: ID!) {
        conference(id: $id) {
            id
            peers {
                id
                user {
                    id
                    name
                    photo
                }
            }
        }
    }
`;