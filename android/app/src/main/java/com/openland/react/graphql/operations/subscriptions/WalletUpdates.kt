package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val WalletUpdatesSelector = obj(
            field("walletUpdates", "event", arguments(fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("WalletUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("WalletUpdate", WalletUpdateFragmentSelector)
                            )))
                    )),
                    inline("WalletUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
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
    override val body = "subscription WalletUpdates(\$state:String!){event:walletUpdates(fromState:\$state){__typename ... on WalletUpdateSingle{__typename state update{__typename ...WalletUpdateFragment}}... on WalletUpdateBatch{__typename state updates{__typename ...WalletUpdateFragment}}}}fragment WalletUpdateFragment on WalletUpdate{__typename ... on WalletUpdateBalance{__typename amount}... on WalletUpdateLocked{__typename isLocked failingPaymentsCount}... on WalletUpdateTransactionSuccess{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionCanceled{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionPending{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdatePaymentStatus{__typename payment{__typename ...Payment}}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename ...Payment}}... on WalletTransactionIncome{__typename amount payment{__typename ...Payment}source{__typename ... on WalletSubscription{__typename id product{__typename ...WalletProduct}}... on Purchase{__typename id user{__typename ...WalletUser}product{__typename ...WalletProduct}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename ...Payment}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename ...Payment}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ...WalletProduct}}payment{__typename ...Payment}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ...WalletProduct}}payment{__typename ...Payment}}}}fragment Payment on Payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fragment WalletProduct on WalletProduct{__typename ... on WalletProductGroup{__typename group{__typename ...WalletGroup}}... on WalletProductDonation{__typename user{__typename ...WalletUser}}... on WalletProductDonationMessage{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}}fragment WalletGroup on SharedRoom{__typename id title photo}fragment WalletUser on User{__typename id name photo}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}"
    override val selector = WalletUpdatesSelector
}