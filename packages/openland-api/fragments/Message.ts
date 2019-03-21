import gql from 'graphql-tag';

export const TinyMessage = gql`
    fragment TinyMessage on ModernMessage {
        id
        date
        sender {
            ...UserTiny
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
`;

export const FullMessage = gql`
    fragment FullMessage on ModernMessage {
        id
        date
        sender {
            ...UserShort
        }
        message
        fallback
        
        ... on GeneralMessage{
            edited
            attachments{
                fallback
                ...on MessageAttachmentFile{
                    id
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
                    keyboard{
                        buttons{
                            title
                            style
                            url
                        }
                    }
                    fallback
                }
            }
            quotedMessages{
                id
                date
                message
                sender {
                    ...UserShort
                }
                message
                fallback
                spans{
                    offset
                    length
                    ...on MessageSpanUserMention{
                        user{
                            ...UserShort
                        }
                    }
                    ...on MessageSpanMultiUserMention{
                        users{
                            ...UserShort
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

            reactions{
                user{
                    ... UserShort
                }
                reaction
            }

        }

       
        spans{
            offset
            length
            ...on MessageSpanUserMention{
                user{
                    ...UserShort
                }
            }
            ...on MessageSpanMultiUserMention{
                users{
                    ...UserShort
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

        ... on ServiceMessage{
            serviceMetadata{
                ...on InviteServiceMetadata {
                    users{
                        ...UserShort
                    }
                    invitedBy{
                        ...UserShort
                    }
                }

                ...on KickServiceMetadata {
                    user{
                        ...UserShort
                    }
                    kickedBy{
                        ...UserShort
                    }
                }

                ...on TitleChangeServiceMetadata {
                    title
                }

                ...on PhotoChangeServiceMetadata {
                    photo
                }

                ...on PostRespondServiceMetadata {
                    respondType
                }
            }
        }
    }
`;