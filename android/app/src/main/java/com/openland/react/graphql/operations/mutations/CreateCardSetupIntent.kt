package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CreateCardSetupIntentSelector = obj(
            field("cardCreateSetupIntent", "cardCreateSetupIntent", arguments(fieldValue("retryKey", refValue("retryKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("clientSecret", "clientSecret", notNull(scalar("String")))
                )))
        )
val CreateCardSetupIntent = object: OperationDefinition {
    override val name = "CreateCardSetupIntent"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CreateCardSetupIntent(\$retryKey:String!){cardCreateSetupIntent(retryKey:\$retryKey){__typename id clientSecret}}"
    override val selector = CreateCardSetupIntentSelector
}