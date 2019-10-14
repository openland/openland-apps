package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceMediaSelector = obj(
            field("conferenceMedia", "conferenceMedia", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("iceServers", "iceServers", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("credential", "credential", scalar("String")),
                            field("urls", "urls", notNull(list(notNull(scalar("String"))))),
                            field("username", "username", scalar("String"))
                        ))))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("ice", "ice", notNull(list(notNull(scalar("String"))))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("sdp", "sdp", scalar("String")),
                            field("state", "state", notNull(scalar("String")))
                        )))))
                )))
        )
val ConferenceMedia = object: OperationDefinition {
    override val name = "ConferenceMedia"
    override val kind = OperationKind.QUERY
    override val body = "query ConferenceMedia(\$id:ID!,\$peerId:ID!){conferenceMedia(id:\$id,peerId:\$peerId){__typename iceServers{__typename credential urls username}id streams{__typename ice id sdp state}}}"
    override val selector = ConferenceMediaSelector
}