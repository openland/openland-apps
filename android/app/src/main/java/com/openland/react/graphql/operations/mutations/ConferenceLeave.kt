package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceLeaveSelector = obj(
            field("conferenceLeave", "conferenceLeave", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val ConferenceLeave = object: OperationDefinition {
    override val name = "ConferenceLeave"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceLeave(\$id:ID!,\$peerId:ID!){conferenceLeave(id:\$id,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = ConferenceLeaveSelector
}