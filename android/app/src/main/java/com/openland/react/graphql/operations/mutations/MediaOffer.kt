package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MediaOfferSelector = obj(
            field("mediaStreamOffer", "mediaStreamOffer", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("offer", refValue("offer")), fieldValue("seq", refValue("seq"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        )))))
                )))
        )
val MediaOffer = object: OperationDefinition {
    override val name = "MediaOffer"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaOffer(\$id:ID!,\$peerId:ID!,\$offer:String!,\$seq:Int!){mediaStreamOffer(id:\$id,peerId:\$peerId,offer:\$offer,seq:\$seq){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource}senders{__typename kind videoSource codecParams}}"
    override val selector = MediaOfferSelector
}