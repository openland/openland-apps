package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatDemoteSelector = obj(
            field("voiceChatDemote", "voiceChatDemote", arguments(fieldValue("id", refValue("id")), fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
val VoiceChatDemote = object: OperationDefinition {
    override val name = "VoiceChatDemote"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatDemote(\$id:ID!,\$uid:ID!){voiceChatDemote(id:\$id,uid:\$uid)}"
    override val selector = VoiceChatDemoteSelector
}