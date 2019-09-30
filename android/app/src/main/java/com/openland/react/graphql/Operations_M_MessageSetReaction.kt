package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MessageSetReactionSelector = obj(
            field("messageReactionAdd","messageReactionAdd", arguments(fieldValue("messageId", refValue("messageId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
val MessageSetReaction = object: OperationDefinition {
    override val name = "MessageSetReaction"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MessageSetReaction(\$messageId:ID!,\$reaction:MessageReactionType!){messageReactionAdd(messageId:\$messageId,reaction:\$reaction)}"
    override val selector = MessageSetReactionSelector
}