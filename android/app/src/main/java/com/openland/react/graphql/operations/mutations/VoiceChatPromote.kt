package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatPromoteSelector = obj(
            field("voiceChatPromote", "voiceChatPromote", arguments(fieldValue("id", refValue("id")), fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
val VoiceChatPromote = object: OperationDefinition {
    override val name = "VoiceChatPromote"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatPromote(\$id:ID!,\$uid:ID!){voiceChatPromote(id:\$id,uid:\$uid)}"
    override val selector = VoiceChatPromoteSelector
}