package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatDeletePinnedMessageSelector = obj(
            field("voiceChatDeletePinnedMessage", "voiceChatDeletePinnedMessage", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val VoiceChatDeletePinnedMessage = object: OperationDefinition {
    override val name = "VoiceChatDeletePinnedMessage"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatDeletePinnedMessage(\$id:ID!){voiceChatDeletePinnedMessage(id:\$id){__typename id}}"
    override val selector = VoiceChatDeletePinnedMessageSelector
}