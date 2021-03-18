package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ActiveVoiceChatsSelector = obj(
            field("activeVoiceChats", "activeVoiceChats", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("cursor", "cursor", scalar("String")),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("VoiceChat", VoiceChatWithSpeakersSelector)
                        )))))
                )))
        )
val ActiveVoiceChats = object: OperationDefinition {
    override val name = "ActiveVoiceChats"
    override val kind = OperationKind.QUERY
    override val body = "query ActiveVoiceChats(\$first:Int!,\$after:String){activeVoiceChats(first:\$first,after:\$after){__typename cursor items{__typename ...VoiceChatWithSpeakers}}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo followersCount}status handRaised}"
    override val selector = ActiveVoiceChatsSelector
}