package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CommentFullReactionsSelector = obj(
            field("commentEntry", "commentEntry", arguments(fieldValue("entryId", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("comment", "comment", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("reactions", "reactions", notNull(list(notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("ModernMessageReaction", MessageUsersReactionsSelector)
                                )))))
                        )))
                ))
        )
val CommentFullReactions = object: OperationDefinition {
    override val name = "CommentFullReactions"
    override val kind = OperationKind.QUERY
    override val body = "query CommentFullReactions(\$id:ID!){commentEntry(entryId:\$id){__typename id comment{__typename id reactions{__typename ...MessageUsersReactions}}}}fragment MessageUsersReactions on ModernMessageReaction{__typename user{__typename id name photo}reaction}"
    override val selector = CommentFullReactionsSelector
}