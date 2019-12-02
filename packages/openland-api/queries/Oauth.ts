import gql from 'graphql-tag';
import { UserTiny } from '../fragments/UserTiny';

export const OauthContextQuery = gql`
    query OauthContext($code: String!) {
        context: oauthContext(code: $code) {
            app {
                title
                clientId
                clientSecret
                scopes
                owner {
                    ...UserTiny
                }
            }
            state
            redirectUrl
            code
        }
    }

    ${UserTiny}
`;
