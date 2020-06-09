package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyNotificationsCenterSelector = obj(
            field("notificationCenterUpdates", "event", arguments(fieldValue("fromState", refValue("state"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("NotificationCenterUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("NotificationCenterUpdate", NotificationCenterUpdateFragmentSelector)
                            )))
                    )),
                    inline("NotificationCenterUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("fromSeq", "fromSeq", notNull(scalar("Int"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("NotificationCenterUpdate", NotificationCenterUpdateFragmentSelector)
                            )))))
                    ))
                ))
        )
val MyNotificationsCenter = object: OperationDefinition {
    override val name = "MyNotificationsCenter"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription MyNotificationsCenter(\$state:String){event:notificationCenterUpdates(fromState:\$state){__typename ... on NotificationCenterUpdateSingle{__typename seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{__typename fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{__typename center{__typename id unread}notification{__typename id}}... on NotificationRead{__typename center{__typename id unread}}... on NotificationContentUpdated{__typename content{__typename ... on UpdatedNotificationContentComment{__typename peer{__typename peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}id subscription{__typename type}}comment{__typename ...CommentEntryFragment}}}}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}subscription{__typename type}}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage id}parentComment{__typename comment:betaComment{__typename id message}id}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ...MessageSource}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename ...MessageReactions}}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}reactions{__typename ...MessageReactions}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment MessageSender on User{__typename id name photo isBot shortname primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSource on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename users{__typename id name}}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ...MessageSource}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}}... on StickerMessage{__typename id senderBadge{__typename ...UserBadge}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment MessageReactions on ModernMessageReaction{__typename user{__typename id name}reaction}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}"
    override val selector = MyNotificationsCenterSelector
}