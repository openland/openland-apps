import gql from 'graphql-tag';

export const MessageLightShort = gql`
 fragment MessageLightShort on Message {
    id
    date
    text
    sender {
        ...UserTiny
    }
 }
`;