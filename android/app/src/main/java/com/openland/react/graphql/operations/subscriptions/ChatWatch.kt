package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatWatchSelector = obj(
            field("chatUpdates", "event", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("ChatUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", ChatUpdateFragmentSelector)
                            )))
                    )),
                    inline("ChatUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("fromSeq", "fromSeq", notNull(scalar("Int"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", ChatUpdateFragmentSelector)
                            )))))
                    ))
                )))
        )
val ChatWatch = object: OperationDefinition {
    override val name = "ChatWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription ChatWatch(\$chatId:ID!,\$state:String){event:chatUpdates(chatId:\$chatId,fromState:\$state){__typename ... on ChatUpdateSingle{__typename seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{__typename fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{__typename message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{__typename message{__typename ...FullMessage}}... on ChatMessageDeleted{__typename message{__typename id}}... on ChatUpdated{__typename chat{__typename ...RoomShort}}... on ChatLostAccess{__typename lostAccess}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}"
    override val selector = ChatWatchSelector
}