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
                    id
                    name
                }
                message
            }
            pinnedMessage {
                id
                date
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
                message
                fallback
                ... on GeneralMessage {
                    attachments {
                        id
                        fallback
                        ...on MessageAttachmentFile {
                            fileId
                            fileMetadata{
                                isImage
                                imageFormat
                                name
                                size
                            }
                            filePreview
                        }
                    }
                    quotedMessages {
                        id
                    }
                }
            }
        }
    }
`;
