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
    override val body = "subscription WalletUpdates(\$state:String!){event:walletUpdates(fromState:\$state){__typename ... on WalletUpdateSingle{__typename state update{__typename ...WalletUpdateFragment}}... on WalletUpdateBatch{__typename state updates{__typename ...WalletUpdateFragment}}}}fragment WalletUpdateFragment on WalletUpdate{__typename ... on WalletUpdateBalance{__typename amount}... on WalletUpdateTransactionSuccess{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionCanceled{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionPending{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdatePaymentStatus{__typename payment{__typename id status intent{__typename id clientSecret}}}}fragment WalletTransactionFragment on WalletTransaction{__typename id status operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status intent{__typename id card{__typename id brand last4}clientSecret}}}... on WalletTransactionSubscription{__typename amount subscription{__typename id product{__typename ... on WalletSubscriptionProductGroup{__typename group{__typename id title photo}}}}payment{__typename id status intent{__typename id card{__typename id brand last4}clientSecret}}}... on WalletTransactionTransferOut{__typename walletAmount chargeAmount payment{__typename id status intent{__typename id card{__typename id brand last4}clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status intent{__typename id card{__typename id brand last4}clientSecret}}fromUser{__typename ...UserShort}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = WalletUpdatesSelector
}