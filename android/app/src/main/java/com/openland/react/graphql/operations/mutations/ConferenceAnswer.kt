package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceAnswerSelector = obj(
            field("peerConnectionAnswer", "peerConnectionAnswer", arguments(fieldValue("answer", refValue("answer")), fieldValue("id", refValue("id")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val ConferenceAnswer = object: OperationDefinition {
    override val name = "ConferenceAnswer"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceAnswer(\$answer:String!,\$id:ID!,\$ownPeerId:ID!,\$peerId:ID!){peerConnectionAnswer(answer:\$answer,id:\$id,ownPeerId:\$ownPeerId,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
    override val selector = ConferenceAnswerSelector
}