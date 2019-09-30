package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceKeepAliveSelector = obj(
            field("conferenceKeepAlive","conferenceKeepAlive", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val ConferenceKeepAlive = object: OperationDefinition {
    override val name = "ConferenceKeepAlive"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceKeepAlive(\$id:ID!,\$peerId:ID!){conferenceKeepAlive(id:\$id,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
    override val selector = ConferenceKeepAliveSelector
}