import gql from 'graphql-tag';
import { UserTiny } from '../fragments/UserTiny';

export const OauthContextQuery = gql`
    query OauthContext($code: String!) {
        context: oauthContext(code: $code) {
            app {
                id
                title
                scopes
                image {
                    uuid
                    crop {
                        x
                        y
                        w
                        h
                    }
                }
            }
            state
            redirectUrl
            code
        }
    }

    ${UserTiny}
`;
