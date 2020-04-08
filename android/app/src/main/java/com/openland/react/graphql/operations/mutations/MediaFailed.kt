package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MediaFailedSelector = obj(
            field("mediaStreamFailed", "mediaStreamFailed", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        )))))
                )))
        )
val MediaFailed = object: OperationDefinition {
    override val name = "MediaFailed"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaFailed(\$id:ID!,\$peerId:ID!){mediaStreamFailed(id:\$id,peerId:\$peerId){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id peerId state seq sdp ice settings{__typename videoIn videoOut audioIn audioOut iceTransportPolicy}}"
    override val selector = MediaFailedSelector
}