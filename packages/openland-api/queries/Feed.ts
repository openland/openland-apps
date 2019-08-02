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

export const GlobalFeedHomeQuery = gql`
    query GlobalFeedHome {
        homeFeed: alphaHomeFeed {
            ... on FeedItem {
                id
                content {
                    ...on FeedPost {
                        message { 
                            id
                            message
                            sender {
                                ...UserShort
                            }
                            reactions {
                                reaction
                            }
                        }
                    }
                }
            }
        }
    }
    ${UserShort}
`;

export const GlobalFeedPostMutation = gql`
    mutation GlobalFeedPost($message: String!) {
        alphaCreateGlobalFeedPost(message: $message)
    }
`;

export const FeedPostMutation = gql`
    mutation FeedPost($message: String!) {
        alphaCreateFeedPost(message: $message) {
            id
        }
    }
`;