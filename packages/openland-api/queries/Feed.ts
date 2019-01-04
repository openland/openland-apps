import gql from 'graphql-tag';
import { UserShort } from 'openland-api/fragments/UserShort';

export const FeedHomeQuery = gql`
    query FeedHome {
        homeFeed: alphaHomeFeed {
            id
            text
            date
            by: alphaBy {
                ...UserShort
            }
        }
    }
    ${UserShort}
`;

export const FeedPostMutation = gql`
    mutation FeedPost($message: String!) {
        alphaCreateFeedPost(message: $message) {
            id
        }
    }
`