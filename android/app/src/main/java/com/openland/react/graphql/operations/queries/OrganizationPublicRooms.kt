package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationPublicRoomsSelector = obj(
            field("organizationPublicRooms", "organizationPublicRooms", arguments(fieldValue("id", refValue("organizationId")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", SharedRoomViewSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val OrganizationPublicRooms = object: OperationDefinition {
    override val name = "OrganizationPublicRooms"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationPublicRooms(\$organizationId:ID!,\$first:Int!,\$after:ID){organizationPublicRooms(id:\$organizationId,first:\$first,after:\$after){__typename items{__typename ...SharedRoomView}cursor}}fragment SharedRoomView on SharedRoom{__typename id title photo membersCount photo}"
    override val selector = OrganizationPublicRoomsSelector
}