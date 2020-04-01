package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MessageSetDonationReactionSelector = obj(
            field("messageDonationReactionAdd", "messageDonationReactionAdd", arguments(fieldValue("messageId", refValue("messageId"))), notNull(scalar("Boolean")))
        )
val MessageSetDonationReaction = object: OperationDefinition {
    override val name = "MessageSetDonationReaction"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MessageSetDonationReaction(\$messageId:ID!){messageDonationReactionAdd(messageId:\$messageId)}"
    override val selector = MessageSetDonationReactionSelector
}