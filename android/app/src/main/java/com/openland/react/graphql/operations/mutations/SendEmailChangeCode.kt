package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SendEmailChangeCodeSelector = obj(
            field("sendEmailChangeCode", "sendEmailChangeCode", arguments(fieldValue("newEmail", refValue("email"))), notNull(scalar("String")))
        )
val SendEmailChangeCode = object: OperationDefinition {
    override val name = "SendEmailChangeCode"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SendEmailChangeCode(\$email:String!){sendEmailChangeCode(newEmail:\$email)}"
    override val selector = SendEmailChangeCodeSelector
}