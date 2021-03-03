package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatJoinSelector = obj(
            field("voiceChatJoin", "voiceChatJoin", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val VoiceChatJoin = object: OperationDefinition {
    override val name = "VoiceChatJoin"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatJoin(\$id:ID!){voiceChatJoin(id:\$id){__typename id}}"
    override val selector = VoiceChatJoinSelector
}