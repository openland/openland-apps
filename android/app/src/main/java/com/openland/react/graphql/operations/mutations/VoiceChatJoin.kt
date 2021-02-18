package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatJoinSelector = obj(
            field("voiceChatJoin", "voiceChatJoin", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("VoiceChat", VoiceChatWithSpeakersSelector)
                )))
        )
val VoiceChatJoin = object: OperationDefinition {
    override val name = "VoiceChatJoin"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatJoin(\$id:ID!){voiceChatJoin(id:\$id){__typename ...VoiceChatWithSpeakers}}fragment VoiceChatWithSpeakers on VoiceChat{__typename id title listenersCount speakersCount speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo}status}"
    override val selector = VoiceChatJoinSelector
}