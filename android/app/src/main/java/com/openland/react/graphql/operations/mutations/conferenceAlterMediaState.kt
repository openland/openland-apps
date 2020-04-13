package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val conferenceAlterMediaStateSelector = obj(
            field("conferenceAlterMediaState", "conferenceAlterMediaState", arguments(fieldValue("id", refValue("id")), fieldValue("state", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val conferenceAlterMediaState = object: OperationDefinition {
    override val name = "conferenceAlterMediaState"
    override val kind = OperationKind.MUTATION
    override val body = "mutation conferenceAlterMediaState(\$id:ID!,\$state:MediaStreamMediaStateInput!){conferenceAlterMediaState(id:\$id,state:\$state){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = conferenceAlterMediaStateSelector
}