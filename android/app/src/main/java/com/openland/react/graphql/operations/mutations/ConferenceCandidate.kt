package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceCandidateSelector = obj(
            field("peerConnectionCandidate", "peerConnectionCandidate", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("candidate", refValue("candidate"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val ConferenceCandidate = object: OperationDefinition {
    override val name = "ConferenceCandidate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceCandidate(\$id:ID!,\$ownPeerId:ID!,\$peerId:ID!,\$candidate:String!){peerConnectionCandidate(id:\$id,peerId:\$peerId,ownPeerId:\$ownPeerId,candidate:\$candidate){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = ConferenceCandidateSelector
}