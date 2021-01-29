package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MessagesSearchFullSelector = obj(
            field("messagesSearch", "messagesSearch", arguments(fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("cid", refValue("cid"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("chat", "chat", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("PrivateRoom", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("user", "user", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String"))),
                                                        field("photo", "photo", scalar("String"))
                                                    ))),
                                                field("settings", "settings", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("mute", "mute", scalar("Boolean"))
                                                    )))
                                            )),
                                            inline("SharedRoom", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("kind", "kind", notNull(scalar("String"))),
                                                field("title", "title", notNull(scalar("String"))),
                                                field("membership", "membership", notNull(scalar("String"))),
                                                field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                                field("role", "role", notNull(scalar("String"))),
                                                field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                                                field("photo", "photo", notNull(scalar("String"))),
                                                field("settings", "settings", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("mute", "mute", scalar("Boolean"))
                                                    )))
                                            ))
                                        ))),
                                    field("message", "message", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("ModernMessage", FullMessageSelector)
                                        )))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
val MessagesSearchFull = object: OperationDefinition {
    override val name = "MessagesSearchFull"
    override val kind = OperationKind.QUERY
    override val body = "query MessagesSearchFull(\$query:String!,\$sort:String,\$first:Int!,\$after:String,\$cid:ID){messagesSearch(query:\$query,sort:\$sort,first:\$first,after:\$after,cid:\$cid){__typename edges{__typename node{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind title membership isChannel role canEdit photo settings{__typename id mute}}}message{__typename ...FullMessage}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}"
    override val selector = MessagesSearchFullSelector
}