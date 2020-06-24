package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SendEmailPairCodeSelector = obj(
            field("sendEmailPairCode", "sendEmailPairCode", arguments(fieldValue("email", refValue("email"))), notNull(scalar("String")))
        )
val SendEmailPairCode = object: OperationDefinition {
    override val name = "SendEmailPairCode"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SendEmailPairCode(\$email:String!){sendEmailPairCode(email:\$email)}"
    override val selector = SendEmailPairCodeSelector
}