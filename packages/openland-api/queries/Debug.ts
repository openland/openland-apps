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
export const DebugOwnAccountsQuery = gql`
    query DebugOwnAccounts {
        orgs: alphaAvailableOrganizationAccounts {
            id
            title
            photo
            website
        }
    }    
`;