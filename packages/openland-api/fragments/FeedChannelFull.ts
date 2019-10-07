import gql from 'graphql-tag';

export const FeedChannelFull = gql`
    fragment FeedChannelFull on FeedChannel {
        id
        title
        about
        photo
        type
    }
`;