import gql from 'graphql-tag';

export const FeedChannelFull = gql`
    fragment FeedChannelFull on FeedChannel {
        id
        title
        about
        photo
        subscribed
        myRole
        subscribersCount
        shortname
        isGlobal
        socialImage
    }
`;