package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatCreateSelector = obj(
            field("voiceChatCreate", "voiceChatCreate", arguments(fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("VoiceChat", VoiceChatSelector)
                )))
        )
val VoiceChatCreate = object: OperationDefinition {
    override val name = "VoiceChatCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatCreate(\$input:VoiceChatInput!){voiceChatCreate(input:\$input){__typename ...VoiceChat}}fragment VoiceChat on VoiceChat{__typename id title listenersCount speakersCount speakers{__typename id user{__typename id name photo}status}}"
    override val selector = VoiceChatCreateSelector
}