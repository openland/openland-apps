package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val conferenceRemoveScreenShareSelector = obj(
            field("conferenceRemoveScreenShare", "conferenceRemoveScreenShare", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val conferenceRemoveScreenShare = object: OperationDefinition {
    override val name = "conferenceRemoveScreenShare"
    override val kind = OperationKind.MUTATION
    override val body = "mutation conferenceRemoveScreenShare(\$id:ID!){conferenceRemoveScreenShare(id:\$id){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = conferenceRemoveScreenShareSelector
}