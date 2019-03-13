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
        ... on GeneralMessage{
            attachments{
                id
                fallback
                ...on MessageAttachmentFile{
                    fileId
                    fileMetadata{
                        isImage
                        imageFormat
                    }
                    filePreview
                }
            }
            quotedMessages{
                id
            }
        }
        # spans{
        #     offset
        #     length
        #     ...on MessageSpanUserMention{
        #         user{
        #             ...UserTiny
        #         }
        #     }
        #     ...on MessageSpanRoomMention{
        #         room{
        #             ...RoomShort
        #         }
        #     }
        #     ...on MessageSpanLink{
        #         url
        #     }
        # }

        # ... on ServiceMessage{
        #     serviceMetadata{
        #         ...on InviteServiceMetadata {
        #             users{
        #                 ...UserTiny
        #             }
        #             invitedBy{
        #                 ...UserTiny
        #             }
        #         }

        #         ...on KickServiceMetadata {
        #             user{
        #                 ...UserTiny
        #             }
        #             kickedBy{
        #                 ...UserTiny
        #             }
        #         }

        #         ...on TitleChangeServiceMetadata {
        #             title
        #         }

        #         ...on PhotoChangeServiceMetadata {
        #             photo
        #         }

        #         ...on PostRespondServiceMetadata {
        #             respondType
        #         }


        #     }
        # }
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
                id
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
            }
            quotedMessages{
                id
            }

            reactions{
                user{
                    ... UserTiny
                }
                reaction
            }

        }

       
        spans{
            offset
            length
            ...on MessageSpanUserMention{
                user{
                    ...UserTiny
                }
            }
            ...on MessageSpanRoomMention{
                room{
                    ...RoomShort
                }
            }
            ...on MessageSpanLink{
                url
            }
        }

        ... on ServiceMessage{
            serviceMetadata{
                ...on InviteServiceMetadata {
                    users{
                        ...UserTiny
                    }
                    invitedBy{
                        ...UserTiny
                    }
                }

                ...on KickServiceMetadata {
                    user{
                        ...UserTiny
                    }
                    kickedBy{
                        ...UserTiny
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