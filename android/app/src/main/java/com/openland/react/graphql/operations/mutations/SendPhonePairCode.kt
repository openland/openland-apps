package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SendPhonePairCodeSelector = obj(
            field("sendPhonePairCode", "sendPhonePairCode", arguments(fieldValue("phone", refValue("phone"))), notNull(scalar("String")))
        )
val SendPhonePairCode = object: OperationDefinition {
    override val name = "SendPhonePairCode"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SendPhonePairCode(\$phone:String!){sendPhonePairCode(phone:\$phone)}"
    override val selector = SendPhonePairCodeSelector
}