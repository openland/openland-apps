package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SubscriptionsSelector = obj(
            field("subscriptions", "subscriptions", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("expires", "expires", notNull(scalar("Date"))),
                    field("product", "product", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("WalletSubscriptionProductGroup", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("group", "group", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("title", "title", notNull(scalar("String"))),
                                        field("photo", "photo", notNull(scalar("String")))
                                    )))
                            ))
                        )))
                )))))
        )
val Subscriptions = object: OperationDefinition {
    override val name = "Subscriptions"
    override val kind = OperationKind.QUERY
    override val body = "query Subscriptions{subscriptions{__typename id state expires product{__typename ... on WalletSubscriptionProductGroup{__typename group{__typename id title photo}}}}}"
    override val selector = SubscriptionsSelector
}