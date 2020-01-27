package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationPublicRoomsSelector = obj(
            field("organizationPublicRooms", "organizationPublicRooms", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("cursor", "cursor", scalar("String")),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", SharedRoomViewSelector)
                        )))))
                )))
        )
val OrganizationPublicRooms = object: OperationDefinition {
    override val name = "OrganizationPublicRooms"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationPublicRooms(\$after:ID,\$first:Int!,\$organizationId:ID!){organizationPublicRooms(after:\$after,first:\$first,id:\$organizationId){__typename cursor items{__typename ...SharedRoomView}}}fragment SharedRoomView on SharedRoom{__typename id membersCount photo photo title}"
    override val selector = OrganizationPublicRoomsSelector
}