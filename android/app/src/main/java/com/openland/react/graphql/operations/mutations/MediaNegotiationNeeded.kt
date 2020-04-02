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
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("seq", "seq", notNull(scalar("Int"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
val MediaNegotiationNeeded = object: OperationDefinition {
    override val name = "MediaNegotiationNeeded"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaNegotiationNeeded(\$id:ID!,\$peerId:ID!,\$seq:Int!){mediaStreamNegotiationNeeded(id:\$id,peerId:\$peerId,seq:\$seq){__typename id streams{__typename id peerId state seq sdp ice}}}"
    override val selector = MediaNegotiationNeededSelector
}