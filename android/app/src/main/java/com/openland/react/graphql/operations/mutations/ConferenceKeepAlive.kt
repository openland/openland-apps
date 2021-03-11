package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceKeepAliveSelector = obj(
            field("conferenceKeepAlive", "conferenceKeepAlive", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val ConferenceKeepAlive = object: OperationDefinition {
    override val name = "ConferenceKeepAlive"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceKeepAlive(\$id:ID!,\$peerId:ID!){conferenceKeepAlive(id:\$id,peerId:\$peerId){__typename id}}"
    override val selector = ConferenceKeepAliveSelector
}