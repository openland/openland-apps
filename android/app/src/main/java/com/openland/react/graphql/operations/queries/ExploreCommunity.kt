package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ExploreCommunitySelector = obj(
            field("alphaComunityPrefixSearch", "items", arguments(fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort")), fieldValue("page", refValue("page")), fieldValue("first", intValue(25)), fieldValue("after", refValue("after")), fieldValue("featuredIfEmptyQuery", refValue("featuredIfEmptyQuery"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Organization", CommunitySearchSelector)
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
val ExploreCommunity = object: OperationDefinition {
    override val name = "ExploreCommunity"
    override val kind = OperationKind.QUERY
    override val body = "query ExploreCommunity(\$query:String,\$sort:String,\$page:Int,\$after:String,\$featuredIfEmptyQuery:Boolean){items:alphaComunityPrefixSearch(query:\$query,sort:\$sort,page:\$page,first:25,after:\$after,featuredIfEmptyQuery:\$featuredIfEmptyQuery){__typename edges{__typename node{__typename ...CommunitySearch}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment CommunitySearch on Organization{__typename id superAccountId name photo isMine about status featured:alphaFeatured membersCount roomsCount:betaPublicRoomsCount}"
    override val selector = ExploreCommunitySelector
}