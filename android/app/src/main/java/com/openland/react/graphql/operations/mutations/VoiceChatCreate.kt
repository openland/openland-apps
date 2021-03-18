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
    override val body = "mutation VoiceChatCreate(\$input:VoiceChatInput!){voiceChatCreate(input:\$input){__typename ...VoiceChatWithSpeakers}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount me{__typename ...VoiceChatMeParticipant}}fragment VoiceChatMeParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo followersCount online lastSeen shortname}status handRaised}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo followersCount online lastSeen}status handRaised}"
    override val selector = VoiceChatCreateSelector
}