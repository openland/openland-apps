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
                        )))))
                )))
        )
val ConferenceMediaWatch = object: OperationDefinition {
    override val name = "ConferenceMediaWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription ConferenceMediaWatch(\$id:ID!,\$peerId:ID!){media:alphaConferenceMediaWatch(id:\$id,peerId:\$peerId){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id peerId state seq sdp ice settings{__typename videoIn videoOut videoOutSource audioIn audioOut iceTransportPolicy}mediaState{__typename videoPaused audioPaused videoSource}localStreams{__typename ... on LocalStreamAudioConfig{__typename codec}... on LocalStreamVideoConfig{__typename codec}... on LocalStreamDataChannelConfig{__typename id label ordered}}}"
    override val selector = ConferenceMediaWatchSelector
}