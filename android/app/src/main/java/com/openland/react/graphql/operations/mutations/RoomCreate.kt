package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomCreateSelector = obj(
            field("betaRoomCreate", "room", arguments(fieldValue("kind", refValue("kind")), fieldValue("members", refValue("members")), fieldValue("message", refValue("message")), fieldValue("title", refValue("title")), fieldValue("description", refValue("description")), fieldValue("photoRef", refValue("photoRef")), fieldValue("organizationId", refValue("organizationId")), fieldValue("channel", refValue("channel")), fieldValue("price", refValue("price")), fieldValue("interval", refValue("interval"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val RoomCreate = object: OperationDefinition {
    override val name = "RoomCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomCreate(\$kind:SharedRoomKind!,\$members:[ID!]!,\$message:String,\$title:String,\$description:String,\$photoRef:ImageRefInput,\$organizationId:ID,\$channel:Boolean!,\$price:Int,\$interval:WalletSubscriptionInterval){room:betaRoomCreate(kind:\$kind,members:\$members,message:\$message,title:\$title,description:\$description,photoRef:\$photoRef,organizationId:\$organizationId,channel:\$channel,price:\$price,interval:\$interval){__typename id}}"
    override val selector = RoomCreateSelector
}