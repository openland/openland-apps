import gql from 'graphql-tag';

export const SessionStateFull = gql`
    fragment SessionStateFull on SessionState {
        isLoggedIn
        isProfileCreated
        isAccountActivated
        isAccountExists
        isAccountPicked
        isCompleted
        isBlocked
    }
`;
