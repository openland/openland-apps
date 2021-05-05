package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationMembersSearchSelector = obj(
            field("orgMembersSearch", "orgMembersSearch", arguments(fieldValue("orgId", refValue("orgId")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("page", refValue("page"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("role", "role", notNull(scalar("String"))),
                                    field("user", "user", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("User", UserShortSelector)
                                        )))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
val OrganizationMembersSearch = object: OperationDefinition {
    override val name = "OrganizationMembersSearch"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationMembersSearch(\$orgId:ID!,\$query:String,\$first:Int!,\$after:String,\$page:Int){orgMembersSearch(orgId:\$orgId,query:\$query,first:\$first,after:\$after,page:\$page){__typename edges{__typename node{__typename role user{__typename ...UserShort}}cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot systemBadge}"
    override val selector = OrganizationMembersSearchSelector
}