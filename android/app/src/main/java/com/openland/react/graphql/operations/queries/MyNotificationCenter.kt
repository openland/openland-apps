package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyNotificationCenterSelector = obj(
            field("myNotificationCenter","myNotificationCenter", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("state","state", scalar("String"))
                        ))),
                    field("unread","unread", notNull(scalar("Int")))
                )))
        )
val MyNotificationCenter = object: OperationDefinition {
    override val name = "MyNotificationCenter"
    override val kind = OperationKind.QUERY
    override val body = "query MyNotificationCenter{myNotificationCenter{__typename id state{__typename state}unread}}"
    override val selector = MyNotificationCenterSelector
}