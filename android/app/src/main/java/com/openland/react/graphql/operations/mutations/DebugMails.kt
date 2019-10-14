package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DebugMailsSelector = obj(
            field("debugSendEmail", "debugSendEmail", arguments(fieldValue("type", refValue("type"))), scalar("Boolean"))
        )
val DebugMails = object: OperationDefinition {
    override val name = "DebugMails"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DebugMails(\$type:DebugEmailType!){debugSendEmail(type:\$type)}"
    override val selector = DebugMailsSelector
}