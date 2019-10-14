package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PersistEventsSelector = obj(
            field("track", "track", arguments(fieldValue("did", refValue("did")), fieldValue("events", refValue("events")), fieldValue("isProd", refValue("isProd"))), notNull(scalar("String")))
        )
val PersistEvents = object: OperationDefinition {
    override val name = "PersistEvents"
    override val kind = OperationKind.MUTATION
    override val body = "mutation PersistEvents(\$did:String!,\$events:[Event!]!,\$isProd:Boolean){track(did:\$did,events:\$events,isProd:\$isProd)}"
    override val selector = PersistEventsSelector
}