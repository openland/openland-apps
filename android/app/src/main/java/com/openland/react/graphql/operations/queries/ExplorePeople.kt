package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ExplorePeopleSelector = obj(
            field("userSearch","items", arguments(fieldValue("after", refValue("after")), fieldValue("first", intValue(25)), fieldValue("page", refValue("page")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("isYou","isYou", notNull(scalar("Boolean"))),
                                    fragment("User", UserShortSelector)
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
val ExplorePeople = object: OperationDefinition {
    override val name = "ExplorePeople"
    override val kind = OperationKind.QUERY
    override val body = "query ExplorePeople(\$after:String,\$page:Int,\$query:String,\$sort:String){items:userSearch(after:\$after,first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename isYou ...UserShort}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = ExplorePeopleSelector
}