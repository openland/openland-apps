package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PhonebookWasExportedSelector = obj(
            field("phonebookWasExported", "phonebookWasExported", notNull(scalar("Boolean")))
        )
val PhonebookWasExported = object: OperationDefinition {
    override val name = "PhonebookWasExported"
    override val kind = OperationKind.QUERY
    override val body = "query PhonebookWasExported{phonebookWasExported}"
    override val selector = PhonebookWasExportedSelector
}