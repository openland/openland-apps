package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MediaCandidateSelector = obj(
            field("mediaStreamCandidate","mediaStreamCandidate", arguments(fieldValue("candidate", refValue("candidate")), fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )))))
                )))
        )
val MediaCandidate = object: OperationDefinition {
    override val name = "MediaCandidate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaCandidate(\$candidate:String!,\$id:ID!,\$peerId:ID!){mediaStreamCandidate(candidate:\$candidate,id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
    override val selector = MediaCandidateSelector
}