import gql from 'graphql-tag';

export const DebugReadedStatesQuery = gql`
    query DebugReadedStates {
        debugReaderStates {
            id
            title
            remaining
        }
    }
`;

export const DebugSendWelcomeEmailMutation = gql`
    mutation DebugSendWelcomeEmail {
        debugSendWelcomeEmail
    }
`;