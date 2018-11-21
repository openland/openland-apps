import gql from 'graphql-tag';

export const RoomFull = gql`
    fragment RoomFull on Room {
        ... on PrivateRoom{
                id
                user{
                    ... UserShort
                }
                settings{
                    mute
                }
            } 
            ... on SharedRoom{
                id
                kind
                title
                photo
                description
                organization{
                    ... OrganizationShort
                }
                membership
                role
                membersCount
                members{
                    role
                    membership
                    user{
                        ... UserShort
                    }
                }
                settings{
                    mute
                }
            }
    }
`;