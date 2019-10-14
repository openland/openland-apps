package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserAvailableRoomsSelector = obj(
            field("betaUserAvailableRooms", "betaUserAvailableRooms", arguments(fieldValue("after", refValue("after")), fieldValue("isChannel", refValue("isChannel")), fieldValue("limit", refValue("limit"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("membersCount", "membersCount", scalar("Int")),
                        field("membership", "membership", notNull(scalar("String"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String"))
                            )),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("title", "title", notNull(scalar("String")))
                    ))
                )))))
        )
val UserAvailableRooms = object: OperationDefinition {
    override val name = "UserAvailableRooms"
    override val kind = OperationKind.QUERY
    override val body = "query UserAvailableRooms(\$after:ID,\$isChannel:Boolean,\$limit:Int!){betaUserAvailableRooms(after:\$after,isChannel:\$isChannel,limit:\$limit){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}"
    override val selector = UserAvailableRoomsSelector
}