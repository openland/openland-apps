import gql from 'graphql-tag';
export const MyProfileFull = gql`
    fragment MyProfileFull on MyProfile {
        isLoggedIn
        isProfileCreated
        isAccountActivated
        isCompleted
        isBlocked
    }
`;
