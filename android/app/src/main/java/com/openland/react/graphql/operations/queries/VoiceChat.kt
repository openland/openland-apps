package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatSelector = obj(
            field("voiceChat", "voiceChat", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("VoiceChat", VoiceChatWithSpeakersSelector)
                )))
        )
val VoiceChat = object: OperationDefinition {
    override val name = "VoiceChat"
    override val kind = OperationKind.QUERY
    override val body = "query VoiceChat(\$id:ID!){voiceChat(id:\$id){__typename ...VoiceChatWithSpeakers}}fragment VoiceChatWithSpeakers on VoiceChat{__typename id title listenersCount speakersCount me{__typename ...VoiceChatParticipant}speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo}status}"
    override val selector = VoiceChatSelector
}