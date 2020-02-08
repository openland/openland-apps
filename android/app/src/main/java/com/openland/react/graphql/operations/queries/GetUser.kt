package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetUserSelector = obj(
            field("alphaResolveShortName", "user", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserNanoSelector)
                    ))
                ))
        )
val GetUser = object: OperationDefinition {
    override val name = "GetUser"
    override val kind = OperationKind.QUERY
    override val body = "query GetUser(\$shortname:String!){user:alphaResolveShortName(shortname:\$shortname){__typename ... on User{__typename ...UserNano}}}fragment UserNano on User{__typename id name firstName lastName photo online}"
    override val selector = GetUserSelector
}