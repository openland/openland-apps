package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ExploreCommunitySelector = obj(
            field("alphaComunityPrefixSearch","items", arguments(fieldValue("after", refValue("after")), fieldValue("featuredIfEmptyQuery", refValue("featuredIfEmptyQuery")), fieldValue("first", intValue(25)), fieldValue("page", refValue("page")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("Organization", CommunitySearchSelector)
                                )))
                        ))))),
                    field("pageInfo","pageInfo", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        )))
                )))
        )
val ExploreCommunity = object: OperationDefinition {
    override val name = "ExploreCommunity"
    override val kind = OperationKind.QUERY
    override val body = "query ExploreCommunity(\$after:String,\$featuredIfEmptyQuery:Boolean,\$page:Int,\$query:String,\$sort:String){items:alphaComunityPrefixSearch(after:\$after,featuredIfEmptyQuery:\$featuredIfEmptyQuery,first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ...CommunitySearch}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured betaPublicRooms{__typename id}id isMine membersCount name photo status superAccountId}"
    override val selector = ExploreCommunitySelector
}