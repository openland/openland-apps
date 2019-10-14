package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomCreateSelector = obj(
            field("betaRoomCreate", "room", arguments(fieldValue("channel", refValue("channel")), fieldValue("description", refValue("description")), fieldValue("kind", refValue("kind")), fieldValue("members", refValue("members")), fieldValue("message", refValue("message")), fieldValue("organizationId", refValue("organizationId")), fieldValue("photoRef", refValue("photoRef")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val RoomCreate = object: OperationDefinition {
    override val name = "RoomCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomCreate(\$channel:Boolean!,\$description:String,\$kind:SharedRoomKind!,\$members:[ID!]!,\$message:String,\$organizationId:ID,\$photoRef:ImageRefInput,\$title:String){room:betaRoomCreate(channel:\$channel,description:\$description,kind:\$kind,members:\$members,message:\$message,organizationId:\$organizationId,photoRef:\$photoRef,title:\$title){__typename id}}"
    override val selector = RoomCreateSelector
}