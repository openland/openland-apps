package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserNanoSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserForMentionSelector)
                )))
        )
val UserNano = object: OperationDefinition {
    override val name = "UserNano"
    override val kind = OperationKind.QUERY
    override val body = "query UserNano(\$id:ID!){user(id:\$id){__typename ...UserForMention}}fragment UserForMention on User{__typename id name photo shortname isBot primaryOrganization{__typename id name}}"
    override val selector = UserNanoSelector
}