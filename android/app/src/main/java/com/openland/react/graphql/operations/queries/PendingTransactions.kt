package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PendingTransactionsSelector = obj(
            field("transactionsPending", "transactionsPending", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("operation", "operation", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("WalletTransactionDeposit", obj(
                                field("amount", "amount", notNull(scalar("Int"))),
                                field("payment", "payment", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("status", "status", notNull(scalar("String")))
                                    ))
                            ))
                        ))),
                    field("status", "status", notNull(scalar("String")))
                )))))
        )
val PendingTransactions = object: OperationDefinition {
    override val name = "PendingTransactions"
    override val kind = OperationKind.QUERY
    override val body = "query PendingTransactions{transactionsPending{__typename id operation{__typename ... on WalletTransactionDeposit{amount payment{__typename id status}}}status}}"
    override val selector = PendingTransactionsSelector
}