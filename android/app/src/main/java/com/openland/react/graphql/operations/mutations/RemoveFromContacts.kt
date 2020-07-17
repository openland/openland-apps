package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RemoveFromContactsSelector = obj(
            field("removeFromContacts", "removeFromContacts", arguments(fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
val RemoveFromContacts = object: OperationDefinition {
    override val name = "RemoveFromContacts"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RemoveFromContacts(\$userId:ID!){removeFromContacts(userId:\$userId)}"
    override val selector = RemoveFromContactsSelector
}