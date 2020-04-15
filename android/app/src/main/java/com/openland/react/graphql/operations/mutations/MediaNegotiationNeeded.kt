package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MediaNegotiationNeededSelector = obj(
            field("mediaStreamNegotiationNeeded", "mediaStreamNegotiationNeeded", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("seq", refValue("seq"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        )))))
                )))
        )
val MediaNegotiationNeeded = object: OperationDefinition {
    override val name = "MediaNegotiationNeeded"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaNegotiationNeeded(\$id:ID!,\$peerId:ID!,\$seq:Int!){mediaStreamNegotiationNeeded(id:\$id,peerId:\$peerId,seq:\$seq){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id peerId state seq sdp ice settings{__typename videoIn videoOut videoOutSource audioIn audioOut iceTransportPolicy}mediaState{__typename videoPaused audioPaused videoSource}}"
    override val selector = MediaNegotiationNeededSelector
}