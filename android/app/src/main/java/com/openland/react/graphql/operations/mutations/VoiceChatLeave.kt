package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatLeaveSelector = obj(
            field("voiceChatLeave", "voiceChatLeave", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val VoiceChatLeave = object: OperationDefinition {
    override val name = "VoiceChatLeave"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatLeave(\$id:ID!){voiceChatLeave(id:\$id){__typename id}}"
    override val selector = VoiceChatLeaveSelector
}