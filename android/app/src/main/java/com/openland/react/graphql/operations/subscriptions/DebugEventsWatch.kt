package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DebugEventsWatchSelector = obj(
            field("debugEvents", "debugEvents", arguments(fieldValue("fromState", refValue("fromState")), fieldValue("eventsCount", refValue("eventsCount")), fieldValue("randomDelays", refValue("randomDelays")), fieldValue("seed", refValue("seed"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("seq", "seq", notNull(scalar("Int"))),
                    field("key", "key", notNull(scalar("String")))
                )))
        )
val DebugEventsWatch = object: OperationDefinition {
    override val name = "DebugEventsWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription DebugEventsWatch(\$fromState:String,\$eventsCount:Int!,\$randomDelays:Boolean!,\$seed:String!){debugEvents(fromState:\$fromState,eventsCount:\$eventsCount,randomDelays:\$randomDelays,seed:\$seed){__typename seq key}}"
    override val selector = DebugEventsWatchSelector
}