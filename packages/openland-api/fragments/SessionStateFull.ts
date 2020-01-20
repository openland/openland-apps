import gql from 'graphql-tag';

export const SessionStateFull = gql`
    fragment SessionStateFull on SessionState {
        isLoggedIn
        isActivated
        isProfileCreated
        isAccountActivated
        isAccountExists
        isAccountPicked
        isCompleted
        isBlocked
    }
`;
