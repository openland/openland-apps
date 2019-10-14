package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceCandidateSelector = obj(
            field("peerConnectionCandidate", "peerConnectionCandidate", arguments(fieldValue("candidate", refValue("candidate")), fieldValue("id", refValue("id")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val ConferenceCandidate = object: OperationDefinition {
    override val name = "ConferenceCandidate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceCandidate(\$candidate:String!,\$id:ID!,\$ownPeerId:ID!,\$peerId:ID!){peerConnectionCandidate(candidate:\$candidate,id:\$id,ownPeerId:\$ownPeerId,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
    override val selector = ConferenceCandidateSelector
}