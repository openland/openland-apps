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