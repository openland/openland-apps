package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChangeEmailSelector = obj(
            field("changeEmail", "changeEmail", arguments(fieldValue("sessionId", refValue("sessionId")), fieldValue("confirmationCode", refValue("confirmationCode"))), notNull(scalar("Boolean")))
        )
val ChangeEmail = object: OperationDefinition {
    override val name = "ChangeEmail"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ChangeEmail(\$sessionId:String!,\$confirmationCode:String!){changeEmail(sessionId:\$sessionId,confirmationCode:\$confirmationCode)}"
    override val selector = ChangeEmailSelector
}