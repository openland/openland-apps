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
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("seq", "seq", notNull(scalar("Int"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
val MediaCandidate = object: OperationDefinition {
    override val name = "MediaCandidate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaCandidate(\$id:ID!,\$peerId:ID!,\$candidate:String!){mediaStreamCandidate(id:\$id,peerId:\$peerId,candidate:\$candidate){__typename id streams{__typename id peerId state seq sdp ice}}}"
    override val selector = MediaCandidateSelector
}