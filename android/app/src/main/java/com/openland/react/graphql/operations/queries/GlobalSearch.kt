package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GlobalSearchSelector = obj(
            field("alphaGlobalSearch", "items", arguments(fieldValue("kinds", refValue("kinds")), fieldValue("query", refValue("query"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("Organization", obj(
                        field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String")))
                    )),
                    inline("User", obj(
                        fragment("User", UserShortSelector)
                    )),
                    inline("SharedRoom", obj(
                        field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
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
                        field("photo", "roomPhoto", notNull(scalar("String"))),
                        field("title", "title", notNull(scalar("String")))
                    ))
                )))))
        )
val GlobalSearch = object: OperationDefinition {
    override val name = "GlobalSearch"
    override val kind = OperationKind.QUERY
    override val body = "query GlobalSearch(\$kinds:[GlobalSearchEntryKind!],\$query:String!){items:alphaGlobalSearch(kinds:\$kinds,query:\$query){__typename ... on Organization{isCommunity:alphaIsCommunity id name}... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = GlobalSearchSelector
}