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
            pinnedMessage{
                id
                date
                sender {
                    id
                    isYou
                    name
                    firstName
                    lastName
                    picture
                    shortname
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