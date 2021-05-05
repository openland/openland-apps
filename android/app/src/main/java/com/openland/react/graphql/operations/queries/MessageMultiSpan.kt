package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MessageMultiSpanSelector = obj(
            field("message", "message", arguments(fieldValue("messageId", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("spans", "spans", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("MessageSpanMultiUserMention", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("users", "users", notNull(list(notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("User", UserSmallSelector)
                                    )))))
                            ))
                        )))))
                ))
        )
val MessageMultiSpan = object: OperationDefinition {
    override val name = "MessageMultiSpan"
    override val kind = OperationKind.QUERY
    override val body = "query MessageMultiSpan(\$id:ID!){message(messageId:\$id){__typename id spans{__typename ... on MessageSpanMultiUserMention{__typename users{__typename ...UserSmall}}}}}fragment UserSmall on User{__typename id name firstName photo shortname isBot systemBadge}"
    override val selector = MessageMultiSpanSelector
}