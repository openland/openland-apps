package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserAvailableRoomsSelector = obj(
            field("alphaUserAvailableRooms", "alphaUserAvailableRooms", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("query", refValue("query"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("kind", "kind", notNull(scalar("String"))),
                                        field("membersCount", "membersCount", notNull(scalar("Int"))),
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
                                )))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
val UserAvailableRooms = object: OperationDefinition {
    override val name = "UserAvailableRooms"
    override val kind = OperationKind.QUERY
    override val body = "query UserAvailableRooms(\$after:String,\$first:Int!,\$query:String){alphaUserAvailableRooms(after:\$after,first:\$first,query:\$query){__typename edges{__typename cursor node{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}pageInfo{__typename hasNextPage}}}"
    override val selector = UserAvailableRoomsSelector
}