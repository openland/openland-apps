package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyContactsStateSelector = obj(
            field("myContactsState", "myContactsState", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
val MyContactsState = object: OperationDefinition {
    override val name = "MyContactsState"
    override val kind = OperationKind.QUERY
    override val body = "query MyContactsState{myContactsState{__typename state}}"
    override val selector = MyContactsStateSelector
}