package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatFullSelector = obj(
            field("voiceChat", "voiceChat", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("VoiceChat", VoiceChatWithSpeakersSelector)
                ))),
            field("voiceChatListeners", "voiceChatListeners", arguments(fieldValue("id", refValue("id")), fieldValue("first", intValue(12))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("VoiceChatParticipant", VoiceChatListenerSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val VoiceChatFull = object: OperationDefinition {
    override val name = "VoiceChatFull"
    override val kind = OperationKind.QUERY
    override val body = "query VoiceChatFull(\$id:ID!){voiceChat(id:\$id){__typename ...VoiceChatWithSpeakers}voiceChatListeners(id:\$id,first:12){__typename items{__typename ...VoiceChatListener}cursor}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatSpeaker}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount handRaisedCount parentRoom{__typename id title photo membership kind isChannel shortname organization{__typename id isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}isPremium role}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatMe}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatMe on VoiceChatParticipant{__typename id user{__typename id photo firstName name shortname}status handRaised}fragment VoiceChatSpeaker on VoiceChatParticipant{__typename ...VoiceChatParticipant status}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id photo firstName name}}fragment VoiceChatListener on VoiceChatParticipant{__typename ...VoiceChatParticipant handRaised}"
    override val selector = VoiceChatFullSelector
}