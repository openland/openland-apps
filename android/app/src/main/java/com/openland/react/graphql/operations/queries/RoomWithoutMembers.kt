package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomWithoutMembersSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullWithoutMembersSelector)
                ))
        )
val RoomWithoutMembers = object: OperationDefinition {
    override val name = "RoomWithoutMembers"
    override val kind = OperationKind.QUERY
    override val body = "query RoomWithoutMembers(\$id:ID!){room(id:\$id){__typename ...RoomFullWithoutMembers}}fragment RoomFullWithoutMembers on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo socialImage description shortname organization{__typename ...OrganizationMedium}membership role membersCount featuredMembersCount settings{__typename id mute}matchmaking{__typename ...MatchmakingRoomFragment}canEdit canSendMessage welcomeMessage{__typename isOn sender{__typename id name}message}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}"
    override val selector = RoomWithoutMembersSelector
}