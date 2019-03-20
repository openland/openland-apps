import gql from 'graphql-tag';

export const RoomShort = gql`
    fragment RoomShort on Room {
        ... on PrivateRoom {
            id
            user {
                ...UserShort
            }
        } 
        ... on SharedRoom {
            id
            kind
            title
            photo
            membership
            role
            membersCount
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

            organization{
                ...OrganizationShort
            }
        }
    }
`;