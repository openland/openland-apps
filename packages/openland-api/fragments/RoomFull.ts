import gql from 'graphql-tag';

export const RoomFull = gql`
    fragment RoomFull on Room {
        ... on PrivateRoom {
            id
            user {
                ...UserShort
            }
            settings {
                id
                mute
            }
        }
        ... on SharedRoom {
            id
            kind
            title
            photo
            socialImage
            description
            organization {
                ...OrganizationMedium
            }
            membership
            role
            membersCount
            members {
                role
                membership
                user {
                    ...UserShort
                }
                canKick,
            }
            requests {
                user {
                    ...UserShort
                }
            }
            settings {
                id
                mute
            }
            canEdit
            pinnedMessage {
                ... on GeneralMessage {
                    id
                    message
                    sender {
                        id
                        name
                        photo
                    }
                    attachments {
                        ...on MessageAttachmentFile {
                            id
                            fileMetadata {
                                name
                                size
                                isImage
                                imageWidth
                                imageHeight
                            }
                        }
                    }
                }
            }
        }
    }
`;
