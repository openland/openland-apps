package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val WalletUpdatesSelector = obj(
            field("walletUpdates", "event", arguments(fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("WalletUpdateSingle", obj(
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("WalletUpdate", WalletUpdateFragmentSelector)
                            )))
                    )),
                    inline("WalletUpdateBatch", obj(
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("WalletUpdate", WalletUpdateFragmentSelector)
                            )))))
                    ))
                )))
        )
val WalletUpdates = object: OperationDefinition {
    override val name = "WalletUpdates"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription WalletUpdates(\$state:String!){event:walletUpdates(fromState:\$state){__typename ... on WalletUpdateSingle{state update{__typename ...WalletUpdateFragment}}... on WalletUpdateBatch{state updates{__typename ...WalletUpdateFragment}}}}fragment WalletUpdateFragment on WalletUpdate{__typename ... on WalletUpdateBalance{amount}... on WalletUpdateTransactionSuccess{transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionCanceled{transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionPending{transaction{__typename ...WalletTransactionFragment}}}fragment WalletTransactionFragment on WalletTransaction{__typename id operation{__typename ... on WalletTransactionDeposit{amount payment{__typename id intent{__typename clientSecret id}status}}}status}"
    override val selector = WalletUpdatesSelector
}