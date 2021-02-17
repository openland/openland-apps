package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatUserSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("uid"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("followingCount", "followingCount", notNull(scalar("Int"))),
                    field("followersCount", "followersCount", notNull(scalar("Int"))),
                    field("followedByMe", "followedByMe", notNull(scalar("Boolean")))
                )))
        )
val VoiceChatUser = object: OperationDefinition {
    override val name = "VoiceChatUser"
    override val kind = OperationKind.QUERY
    override val body = "query VoiceChatUser(\$uid:ID!){user(id:\$uid){__typename id followingCount followersCount followedByMe}}"
    override val selector = VoiceChatUserSelector
}