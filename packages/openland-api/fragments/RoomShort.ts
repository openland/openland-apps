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
            canEdit
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
                                imageWidth
                                imageHeight
                            }
                            filePreview
                        }
                    }
                    quotedMessages{
                        id
                        date
                        message
                        sender {
                            id
                            name
                        }
                        message
                        fallback
                        spans{
                            offset
                            length
                            ...on MessageSpanUserMention{
                                user{
                                    id
                                    name
                                }
                            }
                            ...on MessageSpanMultiUserMention{
                                users{
                                    id
                                    name
                                }
                            }
                            ...on MessageSpanRoomMention{
                                room{
                                    ... on PrivateRoom {
                                        id
                                        user {
                                            id
                                            name
                                        }
                                    } 
                                    ... on SharedRoom {
                                        id
                                        title
                                    }
                                }
                            }
                            ...on MessageSpanLink{
                                url
                                text
                            }
                        }

                        ...on GeneralMessage{
                            edited
                            attachments{
                                fallback
                                ...on MessageAttachmentFile{
                                    fileId
                                    fileMetadata{
                                        name
                                        mimeType
                                        size
                                        isImage
                                        imageWidth
                                        imageHeight
                                        imageFormat
                                    }
                                    filePreview
                                }

                                ...on MessageRichAttachment{
                                    title
                                    subTitle
                                    titleLink
                                    titleLinkHostname
                                    text
                                    icon{
                                        url
                                        metadata{
                                            name
                                            mimeType
                                            size
                                            isImage
                                            imageWidth
                                            imageHeight
                                            imageFormat
                                        }
                                    }
                                    image{
                                        url
                                        metadata{
                                            name
                                            mimeType
                                            size
                                            isImage
                                            imageWidth
                                            imageHeight
                                            imageFormat
                                        }
                                    }
                                    fallback
                                }
                            }
                        }
                    }
                }
            }

            organization{
                ...OrganizationShort
            }
        }
    }
`;