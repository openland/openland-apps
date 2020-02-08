package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomSearchSelector = obj(
            field("betaRoomSearch", "items", arguments(fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort")), fieldValue("page", refValue("page")), fieldValue("first", intValue(25))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("kind", "kind", notNull(scalar("String"))),
                                        field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                        field("title", "title", notNull(scalar("String"))),
                                        field("photo", "photo", notNull(scalar("String"))),
                                        field("membership", "membership", notNull(scalar("String"))),
                                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                                        field("organization", "organization", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("photo", "photo", scalar("String")),
                                                field("name", "name", notNull(scalar("String")))
                                            ))
                                    ))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
val RoomSearch = object: OperationDefinition {
    override val name = "RoomSearch"
    override val kind = OperationKind.QUERY
    override val body = "query RoomSearch(\$query:String,\$sort:String,\$page:Int){items:betaRoomSearch(query:\$query,sort:\$sort,page:\$page,first:25){__typename edges{__typename node{__typename ... on SharedRoom{__typename id kind isChannel title photo membership membersCount organization{__typename id photo name}}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}"
    override val selector = RoomSearchSelector
}