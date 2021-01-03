package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MessageSelector = obj(
            field("message", "message", arguments(fieldValue("messageId", refValue("messageId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("source", "source", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("MessageSourceChat", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("chat", "chat", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        inline("PrivateRoom", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("user", "user", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("isBot", "isBot", notNull(scalar("Boolean"))),
                                                    field("name", "name", notNull(scalar("String")))
                                                ))),
                                            field("pinnedMessage", "pinnedMessage", obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID")))
                                                ))
                                        )),
                                        inline("SharedRoom", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("title", "title", notNull(scalar("String"))),
                                            field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                            field("membersCount", "membersCount", notNull(scalar("Int"))),
                                            field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
                                            field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                                            field("repliesEnabled", "repliesEnabled", notNull(scalar("Boolean"))),
                                            field("pinnedMessage", "pinnedMessage", obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID")))
                                                )),
                                            field("role", "role", notNull(scalar("String")))
                                        ))
                                    )))
                            ))
                        )),
                    fragment("ModernMessage", FullMessageWithoutSourceSelector)
                )),
            field("comments", "comments", arguments(fieldValue("peerId", refValue("messageId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("subscription", "subscription", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("type", "type", scalar("String"))
                        ))
                )))
        )
val Message = object: OperationDefinition {
    override val name = "Message"
    override val kind = OperationKind.QUERY
    override val body = "query Message(\$messageId:ID!){message(messageId:\$messageId){__typename ...FullMessageWithoutSource source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id isBot name}pinnedMessage{__typename id}}... on SharedRoom{__typename id title isChannel membersCount canSendMessage canEdit repliesEnabled pinnedMessage{__typename id}role}}}}}comments(peerId:\$messageId){__typename id subscription{__typename type}}}fragment FullMessageWithoutSource on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}"
    override val selector = MessageSelector
}