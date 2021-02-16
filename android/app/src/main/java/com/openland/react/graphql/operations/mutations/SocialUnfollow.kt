package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SocialUnfollowSelector = obj(
            field("socialUnfollow", "socialUnfollow", arguments(fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
val SocialUnfollow = object: OperationDefinition {
    override val name = "SocialUnfollow"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SocialUnfollow(\$uid:ID!){socialUnfollow(uid:\$uid)}"
    override val selector = SocialUnfollowSelector
}