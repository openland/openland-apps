package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatCreateSelector = obj(
            field("voiceChatCreate", "voiceChatCreate", arguments(fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("VoiceChat", VoiceChatWithSpeakersSelector)
                )))
        )
val VoiceChatCreate = object: OperationDefinition {
    override val name = "VoiceChatCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatCreate(\$input:VoiceChatInput!){voiceChatCreate(input:\$input){__typename ...VoiceChatWithSpeakers}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname organization{__typename id isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}isPremium role}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot systemBadge}"
    override val selector = VoiceChatCreateSelector
}