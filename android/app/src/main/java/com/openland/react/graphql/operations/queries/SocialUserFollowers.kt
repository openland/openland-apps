package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SocialUserFollowersSelector = obj(
            field("socialUserFollowers", "socialUserFollowers", arguments(fieldValue("uid", refValue("uid")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserFollowerSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val SocialUserFollowers = object: OperationDefinition {
    override val name = "SocialUserFollowers"
    override val kind = OperationKind.QUERY
    override val body = "query SocialUserFollowers(\$uid:ID!,\$first:Int!,\$after:String){socialUserFollowers(uid:\$uid,first:\$first,after:\$after){__typename items{__typename ...UserFollower}cursor}}fragment UserFollower on User{__typename id name shortname about followersCount followedByMe photo}"
    override val selector = SocialUserFollowersSelector
}