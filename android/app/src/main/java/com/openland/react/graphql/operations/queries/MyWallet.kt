package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyWalletSelector = obj(
            field("myWallet", "myWallet", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("balance", "balance", notNull(scalar("Int"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
val MyWallet = object: OperationDefinition {
    override val name = "MyWallet"
    override val kind = OperationKind.QUERY
    override val body = "query MyWallet{myWallet{__typename balance id state}}"
    override val selector = MyWalletSelector
}