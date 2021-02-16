package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatKickSelector = obj(
            field("voiceChatKick", "voiceChatKick", arguments(fieldValue("id", refValue("id")), fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
val VoiceChatKick = object: OperationDefinition {
    override val name = "VoiceChatKick"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatKick(\$id:ID!,\$uid:ID!){voiceChatKick(id:\$id,uid:\$uid)}"
    override val selector = VoiceChatKickSelector
}