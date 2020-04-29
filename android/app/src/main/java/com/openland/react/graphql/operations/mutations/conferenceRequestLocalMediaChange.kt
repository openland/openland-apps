package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val conferenceRequestLocalMediaChangeSelector = obj(
            field("conferenceRequestLocalMediaChange", "conferenceRequestLocalMediaChange", arguments(fieldValue("id", refValue("id")), fieldValue("media", refValue("media"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val conferenceRequestLocalMediaChange = object: OperationDefinition {
    override val name = "conferenceRequestLocalMediaChange"
    override val kind = OperationKind.MUTATION
    override val body = "mutation conferenceRequestLocalMediaChange(\$id:ID!,\$media:LocalMediaInput!){conferenceRequestLocalMediaChange(id:\$id,media:\$media){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = conferenceRequestLocalMediaChangeSelector
}