package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceMediaWatchSelector = obj(
            field("alphaConferenceMediaWatch", "media", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
val ConferenceMediaWatch = object: OperationDefinition {
    override val name = "ConferenceMediaWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription ConferenceMediaWatch(\$id:ID!,\$peerId:ID!){media:alphaConferenceMediaWatch(id:\$id,peerId:\$peerId){__typename id streams{__typename id peerId state sdp ice}}}"
    override val selector = ConferenceMediaWatchSelector
}