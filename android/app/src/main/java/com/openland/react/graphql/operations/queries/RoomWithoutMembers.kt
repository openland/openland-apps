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
    override val body = "query RoomWithoutMembers(\$id:ID!){room(id:\$id){__typename ...RoomFullWithoutMembers}}fragment RoomFullWithoutMembers on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
    override val selector = RoomWithoutMembersSelector
}