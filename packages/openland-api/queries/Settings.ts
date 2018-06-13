import gql from 'graphql-tag';

export const ProfileQuery = gql`
    query Profile {
        profile: myProfile {
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

export const ProfileCreateMutation = gql`
    mutation ProfileCreate($input: CreateProfileInput!) {
        createProfile(input: $input) {
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