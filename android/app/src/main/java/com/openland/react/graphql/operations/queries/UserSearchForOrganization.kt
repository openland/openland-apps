package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserSearchForOrganizationSelector = obj(
            field("userSearchForOrg", "userSearchForOrg", arguments(fieldValue("orgId", refValue("orgId")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("isBanned", "isBanned", notNull(scalar("Boolean"))),
                                    field("isMeBanned", "isMeBanned", notNull(scalar("Boolean"))),
                                    fragment("User", UserShortSelector)
                                ))),
                            field("isMember", "isMember", notNull(scalar("Boolean"))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
val UserSearchForOrganization = object: OperationDefinition {
    override val name = "UserSearchForOrganization"
    override val kind = OperationKind.QUERY
    override val body = "query UserSearchForOrganization(\$orgId:ID!,\$query:String,\$first:Int!,\$after:String,\$sort:String){userSearchForOrg(orgId:\$orgId,query:\$query,first:\$first,after:\$after,sort:\$sort){__typename edges{__typename node{__typename ...UserShort isBanned isMeBanned}isMember cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename id name firstName photo online lastSeen isBot shortname primaryOrganization{__typename id name shortname}}"
    override val selector = UserSearchForOrganizationSelector
}