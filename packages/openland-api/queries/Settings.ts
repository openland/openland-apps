import gql from 'graphql-tag';

export const ProfileQuery = gql`
    query Profile {
        profile {
            id
            firstName
            lastName
            photoRef {
                uuid
                crop {
                    x
                    y
                    w
                    h
                }
            }
            email
            phone
            website
            about
            location
        }
    }
`;

export const ProfileUpdateMutation = gql`
    mutation ProfileUpdate($input: UpdateProfileInput!) {
        updateProfile(input: $input) {
            id
            firstName
            lastName
            photoRef {
                uuid
                crop {
                    x
                    y
                    w
                    h
                }
            }
            email
            phone
            website
            about
            location
        }
    }
`;