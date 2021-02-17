package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SocialFollowSelector = obj(
            field("socialFollow", "socialFollow", arguments(fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
val SocialFollow = object: OperationDefinition {
    override val name = "SocialFollow"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SocialFollow(\$uid:ID!){socialFollow(uid:\$uid)}"
    override val selector = SocialFollowSelector
}