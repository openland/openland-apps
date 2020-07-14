package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomChatSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("user", "user", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("firstName", "firstName", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String")),
                                field("shortname", "shortname", scalar("String")),
                                field("primaryOrganization", "primaryOrganization", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("name", "name", notNull(scalar("String")))
                                    )),
                                field("isBot", "isBot", notNull(scalar("Boolean"))),
                                field("isYou", "isYou", notNull(scalar("Boolean"))),
                                field("online", "online", notNull(scalar("Boolean"))),
                                field("lastSeen", "lastSeen", scalar("String"))
                            ))),
                        field("pinnedMessage", "pinnedMessage", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessage", FullMessageSelector)
                            )),
                        field("settings", "settings", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("mute", "mute", scalar("Boolean"))
                            ))),
                        field("myBadge", "myBadge", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
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
                        field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("shortname", "shortname", scalar("String")),
                        field("featuredMembersCount", "featuredMembersCount", notNull(scalar("Int"))),
                        field("socialImage", "socialImage", scalar("String")),
                        field("welcomeMessage", "welcomeMessage", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("isOn", "isOn", notNull(scalar("Boolean"))),
                                field("sender", "sender", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("name", "name", notNull(scalar("String")))
                                    )),
                                field("message", "message", scalar("String"))
                            )),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("Organization", OrganizationMediumSelector)
                            )),
                        field("canUnpinMessage", "canUnpinMessage", notNull(scalar("Boolean"))),
                        field("pinnedMessage", "pinnedMessage", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessage", FullMessageSelector)
                            )),
                        field("myBadge", "myBadge", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            )),
                        field("settings", "settings", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("mute", "mute", scalar("Boolean"))
                            ))),
                        field("description", "description", scalar("String")),
                        field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("photo", "photo", scalar("String")),
                                field("name", "name", notNull(scalar("String")))
                            ))))),
                        field("isPremium", "isPremium", notNull(scalar("Boolean"))),
                        field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean"))),
                        field("premiumSubscription", "premiumSubscription", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("state", "state", notNull(scalar("String")))
                            )),
                        field("premiumSettings", "premiumSettings", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("price", "price", notNull(scalar("Int"))),
                                field("interval", "interval", scalar("String"))
                            )),
                        field("owner", "owner", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("firstName", "firstName", notNull(scalar("String"))),
                                field("isYou", "isYou", notNull(scalar("Boolean")))
                            ))
                    ))
                ))
        )
val RoomChat = object: OperationDefinition {
    override val name = "RoomChat"
    override val kind = OperationKind.QUERY
    override val body = "query RoomChat(\$id:ID!){room(id:\$id){__typename ... on PrivateRoom{__typename id user{__typename id name firstName photo shortname primaryOrganization{__typename id name}isBot isYou online lastSeen}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationMedium}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}}}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactions{__typename ...MessageReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactions{__typename ...MessageReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactions on ModernMessageReaction{__typename user{__typename id name photo primaryOrganization{__typename id name}}reaction}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity private:alphaIsPrivate}"
    override val selector = RoomChatSelector
}