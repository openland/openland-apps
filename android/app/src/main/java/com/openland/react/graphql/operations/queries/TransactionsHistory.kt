package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val TransactionsHistorySelector = obj(
            field("transactionsHistory", "transactionsHistory", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("WalletTransaction", WalletTransactionFragmentSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val TransactionsHistory = object: OperationDefinition {
    override val name = "TransactionsHistory"
    override val kind = OperationKind.QUERY
    override val body = "query TransactionsHistory(\$first:Int!,\$after:String){transactionsHistory(first:\$first,after:\$after){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename ...Payment}}... on WalletTransactionIncome{__typename amount payment{__typename ...Payment}source{__typename ... on WalletSubscription{__typename id product{__typename ...WalletProduct}}... on Purchase{__typename id user{__typename ...WalletUser}product{__typename ...WalletProduct}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename ...Payment}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename ...Payment}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ...WalletProduct}}payment{__typename ...Payment}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ...WalletProduct}}payment{__typename ...Payment}}}}fragment Payment on Payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fragment WalletProduct on WalletProduct{__typename ... on WalletProductGroup{__typename group{__typename ...WalletGroup}}... on WalletProductDonation{__typename user{__typename ...WalletUser}}... on WalletProductDonationMessage{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}}fragment WalletGroup on SharedRoom{__typename id title photo}fragment WalletUser on User{__typename id name photo}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot systemBadge}"
    override val selector = TransactionsHistorySelector
}