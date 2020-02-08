package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GlobalSearchSelector = obj(
            field("alphaGlobalSearch", "items", arguments(fieldValue("query", refValue("query")), fieldValue("kinds", refValue("kinds"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("Organization", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String"))),
                        field("about", "about", scalar("String")),
                        field("photo", "photo", scalar("String")),
                        field("shortname", "shortname", scalar("String")),
                        field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean")))
                    )),
                    inline("User", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
                        field("photo", "roomPhoto", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("membership", "membership", notNull(scalar("String"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String"))
                            ))
                    ))
                )))))
        )
val GlobalSearch = object: OperationDefinition {
    override val name = "GlobalSearch"
    override val kind = OperationKind.QUERY
    override val body = "query GlobalSearch(\$query:String!,\$kinds:[GlobalSearchEntryKind!]){items:alphaGlobalSearch(query:\$query,kinds:\$kinds){__typename ... on Organization{__typename id name about photo shortname isCommunity:alphaIsCommunity}... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title canSendMessage roomPhoto:photo membersCount membership organization{__typename id name photo}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = GlobalSearchSelector
}