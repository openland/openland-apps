package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MessageFullReactionsSelector = obj(
            field("message", "message", arguments(fieldValue("messageId", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    inline("GeneralMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("reactions", "reactions", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessageReaction", MessageUsersReactionsSelector)
                            )))))
                    )),
                    inline("StickerMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("reactions", "reactions", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessageReaction", MessageUsersReactionsSelector)
                            )))))
                    ))
                ))
        )
val MessageFullReactions = object: OperationDefinition {
    override val name = "MessageFullReactions"
    override val kind = OperationKind.QUERY
    override val body = "query MessageFullReactions(\$id:ID!){message(messageId:\$id){__typename id ... on GeneralMessage{__typename id reactions{__typename ...MessageUsersReactions}}... on StickerMessage{__typename id reactions{__typename ...MessageUsersReactions}}}}fragment MessageUsersReactions on ModernMessageReaction{__typename user{__typename id name photo}reaction}"
    override val selector = MessageFullReactionsSelector
}