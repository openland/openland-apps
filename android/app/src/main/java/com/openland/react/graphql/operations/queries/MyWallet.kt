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
                ))),
            field("transactionsHistory", "transactionsHistory", arguments(fieldValue("first", intValue(20))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("cursor", "cursor", scalar("String")),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("WalletTransaction", WalletTransactionFragmentSelector)
                        )))))
                ))),
            field("transactionsPending", "transactionsPending", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("WalletTransaction", WalletTransactionFragmentSelector)
                )))))
        )
val MyWallet = object: OperationDefinition {
    override val name = "MyWallet"
    override val kind = OperationKind.QUERY
    override val body = "query MyWallet{myWallet{__typename balance id state}transactionsHistory(first:20){__typename cursor items{__typename ...WalletTransactionFragment}}transactionsPending{__typename ...WalletTransactionFragment}}fragment WalletTransactionFragment on WalletTransaction{__typename id operation{__typename ... on WalletTransactionDeposit{amount payment{__typename id intent{__typename clientSecret id}status}}... on WalletTransactionSubscription{amount subscriptionPayment:payment{__typename id intent{__typename clientSecret id}status}}}status}"
    override val selector = MyWalletSelector
}