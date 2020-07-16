package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverNextPageSelector = obj(
            field("gammaNextDiscoverPage", "betaNextDiscoverPage", arguments(fieldValue("selectedTagsIds", refValue("selectedTagsIds")), fieldValue("excudedGroupsIds", refValue("excudedGroupsIds"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("chats", "chats", list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Room", RoomShortSelector)
                        )))),
                    field("tagGroup", "tagGroup", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("String"))),
                            field("title", "title", scalar("String")),
                            field("subtitle", "subtitle", scalar("String")),
                            field("tags", "tags", notNull(list(notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("String"))),
                                    field("title", "title", notNull(scalar("String")))
                                )))))
                        ))
                ))
        )
val DiscoverNextPage = object: OperationDefinition {
    override val name = "DiscoverNextPage"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverNextPage(\$selectedTagsIds:[String!]!,\$excudedGroupsIds:[String!]!){betaNextDiscoverPage:gammaNextDiscoverPage(selectedTagsIds:\$selectedTagsIds,excudedGroupsIds:\$excudedGroupsIds){__typename chats{__typename ...RoomShort}tagGroup{__typename id title subtitle tags{__typename id title}}}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactions{__typename ...MessageReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactions{__typename ...MessageReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactions on ModernMessageReaction{__typename user{__typename id name photo primaryOrganization{__typename id name}}reaction}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}"
    override val selector = DiscoverNextPageSelector
}