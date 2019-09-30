package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GlobalSearchSelector = obj(
            field("alphaGlobalSearch","items", arguments(fieldValue("kinds", refValue("kinds")), fieldValue("query", refValue("query"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("Organization", obj(
                        fragment("Organization", OrganizationShortSelector)
                    )),
                    inline("User", obj(
                        fragment("User", UserShortSelector)
                    )),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
                        field("photo","roomPhoto", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                )))))
        )
val GlobalSearch = object: OperationDefinition {
    override val name = "GlobalSearch"
    override val kind = OperationKind.QUERY
    override val body = "query GlobalSearch(\$kinds:[GlobalSearchEntryKind!],\$query:String!){items:alphaGlobalSearch(kinds:\$kinds,query:\$query){__typename ... on Organization{...OrganizationShort}... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}}}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}"
    override val selector = GlobalSearchSelector
}