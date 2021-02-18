package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatRaiseHandSelector = obj(
            field("voiceChatRaiseHand", "voiceChatRaiseHand", arguments(fieldValue("id", refValue("id")), fieldValue("raised", refValue("raised"))), notNull(scalar("Boolean")))
        )
val VoiceChatRaiseHand = object: OperationDefinition {
    override val name = "VoiceChatRaiseHand"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatRaiseHand(\$id:ID!,\$raised:Boolean!){voiceChatRaiseHand(id:\$id,raised:\$raised)}"
    override val selector = VoiceChatRaiseHandSelector
}