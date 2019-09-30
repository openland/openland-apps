package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FetchPushSettingsSelector = obj(
            field("pushSettings","pushSettings", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("webPushKey","webPushKey", scalar("String"))
                )))
        )
val FetchPushSettings = object: OperationDefinition {
    override val name = "FetchPushSettings"
    override val kind = OperationKind.QUERY
    override val body = "query FetchPushSettings{pushSettings{__typename webPushKey}}"
    override val selector = FetchPushSettingsSelector
}