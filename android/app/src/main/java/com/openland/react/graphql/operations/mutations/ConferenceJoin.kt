package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceJoinSelector = obj(
            field("conferenceJoin", "conferenceJoin", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("peerId", "peerId", notNull(scalar("ID"))),
                    field("conference", "conference", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Conference", ConferenceShortSelector)
                        )))
                )))
        )
val ConferenceJoin = object: OperationDefinition {
    override val name = "ConferenceJoin"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceJoin(\$id:ID!){conferenceJoin(id:\$id){__typename peerId conference{__typename ...ConferenceShort}}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = ConferenceJoinSelector
}