package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PhonebookAddSelector = obj(
            field("phonebookAdd", "phonebookAdd", arguments(fieldValue("records", refValue("records"))), notNull(scalar("Boolean")))
        )
val PhonebookAdd = object: OperationDefinition {
    override val name = "PhonebookAdd"
    override val kind = OperationKind.MUTATION
    override val body = "mutation PhonebookAdd(\$records:[PhonebookRecordInput!]!){phonebookAdd(records:\$records)}"
    override val selector = PhonebookAddSelector
}