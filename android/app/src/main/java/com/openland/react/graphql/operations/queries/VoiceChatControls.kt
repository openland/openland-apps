package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatControlsSelector = obj(
            field("voiceChat", "voiceChat", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("me", "me", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("shortname", "shortname", scalar("String"))
                                ))),
                            field("status", "status", notNull(scalar("String"))),
                            field("handRaised", "handRaised", scalar("Boolean"))
                        ))
                )))
        )
val VoiceChatControls = object: OperationDefinition {
    override val name = "VoiceChatControls"
    override val kind = OperationKind.QUERY
    override val body = "query VoiceChatControls(\$id:ID!){voiceChat(id:\$id){__typename id me{__typename id user{__typename id shortname}status handRaised}}}"
    override val selector = VoiceChatControlsSelector
}