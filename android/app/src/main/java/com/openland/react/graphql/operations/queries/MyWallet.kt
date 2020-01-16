package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyWalletSelector = obj(
            field("myAccount", "myAccount", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("balance", "balance", notNull(scalar("Int"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val MyWallet = object: OperationDefinition {
    override val name = "MyWallet"
    override val kind = OperationKind.QUERY
    override val body = "query MyWallet{myAccount{__typename balance id}}"
    override val selector = MyWalletSelector
}