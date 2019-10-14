package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomSearchSelector = obj(
            field("betaRoomSearch", "items", arguments(fieldValue("first", intValue(25)), fieldValue("page", refValue("page")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("isChannel", "isChannel", notNull(scalar("Boolean"))),
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
                                )))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int")))
                        )))
                )))
        )
val RoomSearch = object: OperationDefinition {
    override val name = "RoomSearch"
    override val kind = OperationKind.QUERY
    override val body = "query RoomSearch(\$page:Int,\$query:String,\$sort:String){items:betaRoomSearch(first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ... on SharedRoom{id isChannel kind membersCount membership organization{__typename id name photo}photo title}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}"
    override val selector = RoomSearchSelector
}