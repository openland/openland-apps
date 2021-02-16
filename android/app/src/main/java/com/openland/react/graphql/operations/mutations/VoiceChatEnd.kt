package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatEndSelector = obj(
            field("voiceChatEnd", "voiceChatEnd", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val VoiceChatEnd = object: OperationDefinition {
    override val name = "VoiceChatEnd"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatEnd(\$id:ID!){voiceChatEnd(id:\$id){__typename id}}"
    override val selector = VoiceChatEndSelector
}