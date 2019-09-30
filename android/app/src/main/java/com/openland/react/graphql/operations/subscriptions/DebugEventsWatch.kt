package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DebugEventsWatchSelector = obj(
            field("debugEvents","debugEvents", arguments(fieldValue("eventsCount", refValue("eventsCount")), fieldValue("fromState", refValue("fromState")), fieldValue("randomDelays", refValue("randomDelays")), fieldValue("seed", refValue("seed"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("key","key", notNull(scalar("String"))),
                    field("seq","seq", notNull(scalar("Int")))
                )))
        )
val DebugEventsWatch = object: OperationDefinition {
    override val name = "DebugEventsWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription DebugEventsWatch(\$eventsCount:Int!,\$fromState:String,\$randomDelays:Boolean!,\$seed:String!){debugEvents(eventsCount:\$eventsCount,fromState:\$fromState,randomDelays:\$randomDelays,seed:\$seed){__typename key seq}}"
    override val selector = DebugEventsWatchSelector
}