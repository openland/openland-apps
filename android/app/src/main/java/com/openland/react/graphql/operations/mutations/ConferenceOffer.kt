package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceOfferSelector = obj(
            field("peerConnectionOffer","peerConnectionOffer", arguments(fieldValue("id", refValue("id")), fieldValue("offer", refValue("offer")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val ConferenceOffer = object: OperationDefinition {
    override val name = "ConferenceOffer"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceOffer(\$id:ID!,\$offer:String!,\$ownPeerId:ID!,\$peerId:ID!){peerConnectionOffer(id:\$id,offer:\$offer,ownPeerId:\$ownPeerId,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
    override val selector = ConferenceOfferSelector
}