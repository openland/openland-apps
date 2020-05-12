package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceMediaWatchSelector = obj(
            field("alphaConferenceMediaWatch", "media", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        ))))),
                    field("localMedia", "localMedia", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("sendVideo", "sendVideo", notNull(scalar("Boolean"))),
                            field("sendAudio", "sendAudio", notNull(scalar("Boolean"))),
                            field("sendScreencast", "sendScreencast", notNull(scalar("Boolean")))
                        )))
                )))
        )
val ConferenceMediaWatch = object: OperationDefinition {
    override val name = "ConferenceMediaWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription ConferenceMediaWatch(\$id:ID!,\$peerId:ID!){media:alphaConferenceMediaWatch(id:\$id,peerId:\$peerId){__typename id streams{__typename ...MediaStreamFull}localMedia{__typename sendVideo sendAudio sendScreencast}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}"
    override val selector = ConferenceMediaWatchSelector
}