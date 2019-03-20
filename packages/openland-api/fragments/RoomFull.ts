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
                canKick
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
            welcomeMessage {
                isOn
                sender {
                    user {
                        id
                    }
                }
                message
            }
            pinnedMessage {
                ... on GeneralMessage {
                    id
                    date
                    message
                    sender {
                        id
                        name
                        photo
                        photoRef {
                            uuid
                            crop {
                                x
                                y
                                w
                                h
                            }
                        }
                        primaryOrganization {
                            id
                            name
                        }
                    }
                    attachments {
                        ... on MessageAttachmentFile {
                            id
                            fileId
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
