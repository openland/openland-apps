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
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("seq", "seq", notNull(scalar("Int"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
val MediaOffer = object: OperationDefinition {
    override val name = "MediaOffer"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaOffer(\$id:ID!,\$peerId:ID!,\$offer:String!,\$seq:Int!){mediaStreamOffer(id:\$id,peerId:\$peerId,offer:\$offer,seq:\$seq){__typename id streams{__typename id peerId state seq sdp ice}}}"
    override val selector = MediaOfferSelector
}