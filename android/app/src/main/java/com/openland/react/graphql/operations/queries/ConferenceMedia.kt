package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceMediaSelector = obj(
            field("conferenceMedia", "conferenceMedia", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        ))))),
                    field("iceServers", "iceServers", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("urls", "urls", notNull(list(notNull(scalar("String"))))),
                            field("username", "username", scalar("String")),
                            field("credential", "credential", scalar("String"))
                        )))))
                )))
        )
val ConferenceMedia = object: OperationDefinition {
    override val name = "ConferenceMedia"
    override val kind = OperationKind.QUERY
    override val body = "query ConferenceMedia(\$id:ID!,\$peerId:ID!){conferenceMedia(id:\$id,peerId:\$peerId){__typename id streams{__typename ...MediaStreamFull}iceServers{__typename urls username credential}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource}senders{__typename kind videoSource codecParams}}"
    override val selector = ConferenceMediaSelector
}