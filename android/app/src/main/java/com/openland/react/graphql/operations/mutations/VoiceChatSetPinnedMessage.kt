package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatSetPinnedMessageSelector = obj(
            field("voiceChatSetPinnedMessage", "voiceChatSetPinnedMessage", arguments(fieldValue("id", refValue("id")), fieldValue("message", refValue("message")), fieldValue("spans", refValue("spans"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val VoiceChatSetPinnedMessage = object: OperationDefinition {
    override val name = "VoiceChatSetPinnedMessage"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatSetPinnedMessage(\$id:ID!,\$message:String,\$spans:[MessageSpanInput!]){voiceChatSetPinnedMessage(id:\$id,message:\$message,spans:\$spans){__typename id}}"
    override val selector = VoiceChatSetPinnedMessageSelector
}