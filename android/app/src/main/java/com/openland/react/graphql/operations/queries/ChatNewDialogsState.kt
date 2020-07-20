package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatNewDialogsStateSelector = obj(
            field("dialogsState", "state", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", scalar("String"))
                )))
        )
val ChatNewDialogsState = object: OperationDefinition {
    override val name = "ChatNewDialogsState"
    override val kind = OperationKind.QUERY
    override val body = "query ChatNewDialogsState{state:dialogsState{__typename state}}"
    override val selector = ChatNewDialogsStateSelector
}