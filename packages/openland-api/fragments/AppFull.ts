import gql from 'graphql-tag';

export const AppFull = gql`
    fragment AppFull on AppProfile {
        id

        name
        shortname
        photoRef {
            uuid
            crop {
                x
                y
                w
                h
            }
        }
        about

        token {
            salt
        }
    }
`;
