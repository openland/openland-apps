package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatUserSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("uid"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String")),
                    field("followingCount", "followingCount", notNull(scalar("Int"))),
                    field("followersCount", "followersCount", notNull(scalar("Int"))),
                    field("followedByMe", "followedByMe", notNull(scalar("Boolean"))),
                    field("about", "about", scalar("String"))
                ))),
            field("room", "conversation", arguments(fieldValue("id", refValue("uid"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("settings", "settings", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("mute", "mute", scalar("Boolean"))
                            )))
                    ))
                ))
        )
val VoiceChatUser = object: OperationDefinition {
    override val name = "VoiceChatUser"
    override val kind = OperationKind.QUERY
    override val body = "query VoiceChatUser(\$uid:ID!){user(id:\$uid){__typename id name photo followingCount followersCount followedByMe about}conversation:room(id:\$uid){__typename ... on PrivateRoom{__typename id settings{__typename id mute}}}}"
    override val selector = VoiceChatUserSelector
}