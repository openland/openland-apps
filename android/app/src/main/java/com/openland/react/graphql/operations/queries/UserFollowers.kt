package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserFollowersSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("followersCount", "followersCount", notNull(scalar("Int"))),
                    field("followingCount", "followingCount", notNull(scalar("Int")))
                )))
        )
val UserFollowers = object: OperationDefinition {
    override val name = "UserFollowers"
    override val kind = OperationKind.QUERY
    override val body = "query UserFollowers(\$id:ID!){user(id:\$id){__typename id name followersCount followingCount}}"
    override val selector = UserFollowersSelector
}