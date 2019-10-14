package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceJoinSelector = obj(
            field("conferenceJoin", "conferenceJoin", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("conference", "conference", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Conference", ConferenceShortSelector)
                        ))),
                    field("peerId", "peerId", notNull(scalar("ID")))
                )))
        )
val ConferenceJoin = object: OperationDefinition {
    override val name = "ConferenceJoin"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceJoin(\$id:ID!){conferenceJoin(id:\$id){__typename conference{__typename ...ConferenceShort}peerId}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
    override val selector = ConferenceJoinSelector
}