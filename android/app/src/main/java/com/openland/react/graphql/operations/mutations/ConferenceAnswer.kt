package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceAnswerSelector = obj(
            field("peerConnectionAnswer", "peerConnectionAnswer", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("answer", refValue("answer"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val ConferenceAnswer = object: OperationDefinition {
    override val name = "ConferenceAnswer"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceAnswer(\$id:ID!,\$ownPeerId:ID!,\$peerId:ID!,\$answer:String!){peerConnectionAnswer(id:\$id,peerId:\$peerId,ownPeerId:\$ownPeerId,answer:\$answer){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = ConferenceAnswerSelector
}