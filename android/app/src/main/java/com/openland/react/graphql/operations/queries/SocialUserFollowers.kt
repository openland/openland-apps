package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SocialUserFollowersSelector = obj(
            field("socialUserFollowers", "socialUserFollowers", arguments(fieldValue("uid", refValue("uid")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String"))),
                            field("about", "about", scalar("String")),
                            field("followersCount", "followersCount", notNull(scalar("Int"))),
                            field("followedByMe", "followedByMe", notNull(scalar("Boolean"))),
                            field("photo", "photo", scalar("String"))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val SocialUserFollowers = object: OperationDefinition {
    override val name = "SocialUserFollowers"
    override val kind = OperationKind.QUERY
    override val body = "query SocialUserFollowers(\$uid:ID!,\$first:Int!,\$after:String){socialUserFollowers(uid:\$uid,first:\$first,after:\$after){__typename items{__typename id name about followersCount followedByMe photo}cursor}}"
    override val selector = SocialUserFollowersSelector
}