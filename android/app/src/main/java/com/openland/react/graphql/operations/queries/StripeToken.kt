package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val StripeTokenSelector = obj(
            field("stripeToken", "stripeToken", notNull(scalar("String")))
        )
val StripeToken = object: OperationDefinition {
    override val name = "StripeToken"
    override val kind = OperationKind.QUERY
    override val body = "query StripeToken{stripeToken}"
    override val selector = StripeTokenSelector
}