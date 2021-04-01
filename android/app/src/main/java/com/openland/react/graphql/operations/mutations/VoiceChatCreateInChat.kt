package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatCreateInChatSelector = obj(
            field("voiceChatCreateInChat", "voiceChatCreateInChat", arguments(fieldValue("input", refValue("input")), fieldValue("cid", refValue("cid"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("chat", "chat", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("VoiceChat", VoiceChatWithSpeakersSelector)
                        ))),
                    field("peerId", "peerId", notNull(scalar("ID"))),
                    field("conference", "conference", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Conference", ConferenceShortSelector)
                        )))
                )))
        )
val VoiceChatCreateInChat = object: OperationDefinition {
    override val name = "VoiceChatCreateInChat"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatCreateInChat(\$input:VoiceChatInput!,\$cid:ID!){voiceChatCreateInChat(input:\$input,cid:\$cid){__typename chat{__typename ...VoiceChatWithSpeakers}peerId conference{__typename ...ConferenceShort}}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership isChannel}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = VoiceChatCreateInChatSelector
}