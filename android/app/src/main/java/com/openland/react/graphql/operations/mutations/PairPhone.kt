package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PairPhoneSelector = obj(
            field("pairPhone", "pairPhone", arguments(fieldValue("sessionId", refValue("sessionId")), fieldValue("confirmationCode", refValue("confirmationCode"))), notNull(scalar("Boolean")))
        )
val PairPhone = object: OperationDefinition {
    override val name = "PairPhone"
    override val kind = OperationKind.MUTATION
    override val body = "mutation PairPhone(\$sessionId:String!,\$confirmationCode:String!){pairPhone(sessionId:\$sessionId,confirmationCode:\$confirmationCode)}"
    override val selector = PairPhoneSelector
}