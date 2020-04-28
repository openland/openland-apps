package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MediaCandidateSelector = obj(
            field("mediaStreamCandidate", "mediaStreamCandidate", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("candidate", refValue("candidate"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        )))))
                )))
        )
val MediaCandidate = object: OperationDefinition {
    override val name = "MediaCandidate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaCandidate(\$id:ID!,\$peerId:ID!,\$candidate:String!){mediaStreamCandidate(id:\$id,peerId:\$peerId,candidate:\$candidate){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}"
    override val selector = MediaCandidateSelector
}