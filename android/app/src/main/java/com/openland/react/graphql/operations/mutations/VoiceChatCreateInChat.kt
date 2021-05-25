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
    override val body = "mutation VoiceChatCreateInChat(\$input:VoiceChatInput!,\$cid:ID!){voiceChatCreateInChat(input:\$input,cid:\$cid){__typename chat{__typename ...VoiceChatWithSpeakers}peerId conference{__typename ...ConferenceShort}}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatSpeaker}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount handRaisedCount parentRoom{__typename id title photo membership kind isChannel shortname organization{__typename id isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}isPremium role}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatMe}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatMe on VoiceChatParticipant{__typename id user{__typename id photo firstName name shortname}status handRaised}fragment VoiceChatSpeaker on VoiceChatParticipant{__typename ...VoiceChatParticipant status}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id photo firstName name}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = VoiceChatCreateInChatSelector
}