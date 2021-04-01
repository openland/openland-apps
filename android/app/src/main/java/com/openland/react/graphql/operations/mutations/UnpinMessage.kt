package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UnpinMessageSelector = obj(
            field("gammaUnpinMessage", "unpinMessage", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        )
val UnpinMessage = object: OperationDefinition {
    override val name = "UnpinMessage"
    override val kind = OperationKind.MUTATION
    override val body = "mutation UnpinMessage(\$chatId:ID!){unpinMessage:gammaUnpinMessage(chatId:\$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}"
    override val selector = UnpinMessageSelector
}