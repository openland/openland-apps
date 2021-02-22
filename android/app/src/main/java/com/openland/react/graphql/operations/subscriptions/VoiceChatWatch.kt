package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatWatchSelector = obj(
            field("voiceChatWatch", "voiceChatWatch", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("VoiceChat", VoiceChatWithSpeakersSelector)
                )))
        )
val VoiceChatWatch = object: OperationDefinition {
    override val name = "VoiceChatWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription VoiceChatWatch(\$id:ID!){voiceChatWatch(id:\$id){__typename ...VoiceChatWithSpeakers}}fragment VoiceChatWithSpeakers on VoiceChat{__typename id title listenersCount speakersCount me{__typename ...VoiceChatParticipant}speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo}status}"
    override val selector = VoiceChatWatchSelector
}