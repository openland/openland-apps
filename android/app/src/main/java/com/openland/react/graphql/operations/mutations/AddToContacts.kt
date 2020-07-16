package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AddToContactsSelector = obj(
            field("addToContacts", "addToContacts", arguments(fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
val AddToContacts = object: OperationDefinition {
    override val name = "AddToContacts"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AddToContacts(\$userId:ID!){addToContacts(userId:\$userId)}"
    override val selector = AddToContactsSelector
}