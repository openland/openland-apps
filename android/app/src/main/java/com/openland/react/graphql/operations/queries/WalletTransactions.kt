package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val WalletTransactionsSelector = obj(
            field("walletTransactions", "walletTransactions", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("cursor", "cursor", scalar("String")),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("amount", "amount", notNull(scalar("Int"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("readableState", "readableState", notNull(scalar("String"))),
                            field("state", "state", notNull(scalar("String")))
                        )))))
                )))
        )
val WalletTransactions = object: OperationDefinition {
    override val name = "WalletTransactions"
    override val kind = OperationKind.QUERY
    override val body = "query WalletTransactions(\$after:String,\$first:Int!,\$id:ID!){walletTransactions(after:\$after,first:\$first,id:\$id){__typename cursor items{__typename amount id readableState state}}}"
    override val selector = WalletTransactionsSelector
}