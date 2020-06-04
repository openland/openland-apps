package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ExplorePeopleSelector = obj(
            field("userSearch", "items", arguments(fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort")), fieldValue("page", refValue("page")), fieldValue("first", intValue(25)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("isYou", "isYou", notNull(scalar("Boolean"))),
                                    fragment("User", UserShortSelector)
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
val ExplorePeople = object: OperationDefinition {
    override val name = "ExplorePeople"
    override val kind = OperationKind.QUERY
    override val body = "query ExplorePeople(\$query:String,\$sort:String,\$page:Int,\$after:String){items:userSearch(query:\$query,sort:\$sort,page:\$page,first:25,after:\$after){__typename edges{__typename node{__typename ...UserShort isYou}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = ExplorePeopleSelector
}