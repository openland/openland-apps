package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyWalletSelector = obj(
            field("myWallet", "myWallet", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("balance", "balance", notNull(scalar("Int"))),
                    field("state", "state", notNull(scalar("String")))
                ))),
            field("transactionsPending", "transactionsPending", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("WalletTransaction", WalletTransactionFragmentSelector)
                ))))),
            field("transactionsHistory", "transactionsHistory", arguments(fieldValue("first", intValue(20))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("WalletTransaction", WalletTransactionFragmentSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val MyWallet = object: OperationDefinition {
    override val name = "MyWallet"
    override val kind = OperationKind.QUERY
    override val body = "query MyWallet{myWallet{__typename id balance state}transactionsPending{__typename ...WalletTransactionFragment}transactionsHistory(first:20){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionSubscription{__typename amount subscription{__typename id interval product{__typename ... on WalletSubscriptionProductGroup{__typename group{__typename id title photo}}... on WalletSubscriptionProductDonation{__typename user{__typename id name photo}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionTransferOut{__typename walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = MyWalletSelector
}