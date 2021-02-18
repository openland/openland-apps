package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatUpdateSelector = obj(
            field("voiceChatUpdate", "voiceChatUpdate", arguments(fieldValue("id", refValue("id")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val VoiceChatUpdate = object: OperationDefinition {
    override val name = "VoiceChatUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatUpdate(\$id:ID!,\$input:VoiceChatInput!){voiceChatUpdate(id:\$id,input:\$input){__typename id}}"
    override val selector = VoiceChatUpdateSelector
}