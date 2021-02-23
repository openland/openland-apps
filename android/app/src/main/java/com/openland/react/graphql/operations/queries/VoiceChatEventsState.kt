package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatEventsStateSelector = obj(
            field("voiceChatEventsState", "voiceChatEventsState", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
val VoiceChatEventsState = object: OperationDefinition {
    override val name = "VoiceChatEventsState"
    override val kind = OperationKind.QUERY
    override val body = "query VoiceChatEventsState(\$id:ID!){voiceChatEventsState(id:\$id){__typename state}}"
    override val selector = VoiceChatEventsStateSelector
}