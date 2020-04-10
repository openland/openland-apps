package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val conferenceAddScreenShareSelector = obj(
            field("conferenceAddScreenShare", "conferenceAddScreenShare", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val conferenceAddScreenShare = object: OperationDefinition {
    override val name = "conferenceAddScreenShare"
    override val kind = OperationKind.MUTATION
    override val body = "mutation conferenceAddScreenShare(\$id:ID!){conferenceAddScreenShare(id:\$id){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = conferenceAddScreenShareSelector
}