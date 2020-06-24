package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PairEmailSelector = obj(
            field("pairEmail", "pairEmail", arguments(fieldValue("sessionId", refValue("sessionId")), fieldValue("confirmationCode", refValue("confirmationCode"))), notNull(scalar("Boolean")))
        )
val PairEmail = object: OperationDefinition {
    override val name = "PairEmail"
    override val kind = OperationKind.MUTATION
    override val body = "mutation PairEmail(\$sessionId:String!,\$confirmationCode:String!){pairEmail(sessionId:\$sessionId,confirmationCode:\$confirmationCode)}"
    override val selector = PairEmailSelector
}