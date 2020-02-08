package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceOfferSelector = obj(
            field("peerConnectionOffer", "peerConnectionOffer", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("offer", refValue("offer"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
val ConferenceOffer = object: OperationDefinition {
    override val name = "ConferenceOffer"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ConferenceOffer(\$id:ID!,\$ownPeerId:ID!,\$peerId:ID!,\$offer:String!){peerConnectionOffer(id:\$id,peerId:\$peerId,ownPeerId:\$ownPeerId,offer:\$offer){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}"
    override val selector = ConferenceOfferSelector
}